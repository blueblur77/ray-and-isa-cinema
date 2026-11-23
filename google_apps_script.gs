/**
 * Ray & Isa's Movie & TV Catalog — Google Apps Script Web App Backend
 *
 * Spreadsheet ID: 18dMxzqimum6c4KfF7TgD0wZfmqXbjCYTAxxGHoTxvCg
 *
 * Setup:
 * 1. Open your Google Sheet -> Extensions -> Apps Script.
 * 2. Paste this entire file into Code.gs (replacing any default code) and Save.
 * 3. Click Deploy -> New deployment -> Select type: Web app.
 * 4. Execute as: "Me" | Who has access: "Anyone".
 * 5. Authorize and copy the Web App URL into the website's Settings modal.
 */

const SPREADSHEET_ID = '18dMxzqimum6c4KfF7TgD0wZfmqXbjCYTAxxGHoTxvCg';

const BASE_COLUMNS = [
  'Date Requested',
  'Title',
  'Media Type',
  'Season(s) / Quality',
  'Request Status',
  'Added to Plex Date',
  'Requested By'
];

const WEBSITE_COLUMNS = [
  'Watched',
  'Ray Watched',
  'Isa Watched',
  'Watched Date',
  'Poster URL',
  'Year',
  'Genre',
  'Runtime'
];

const HIDDEN_COLUMNS = [
  'Watched Date'
];

function getTargetSheet_() {
  const ss = SpreadsheetApp.getActiveSpreadsheet() || SpreadsheetApp.openById(SPREADSHEET_ID);
  const sheets = ss.getSheets();
  const gidZero = sheets.find(function (s) {
    return s.getSheetId() === 0;
  });
  return gidZero || sheets[0];
}

function formatAndHideColumns_(sheet, headers) {
  try {
    var maxRows = sheet.getMaxRows();
    var watchedDateIdx = headers.indexOf('Watched Date') + 1;
    if (watchedDateIdx > 0 && maxRows > 1) {
      sheet.getRange(2, watchedDateIdx, maxRows - 1, 1).setNumberFormat('yyyy-mm-dd');
    }

    HIDDEN_COLUMNS.forEach(function (colName) {
      var colIdx = headers.indexOf(colName) + 1;
      if (colIdx > 0) {
        if (!sheet.isColumnHiddenByUser || !sheet.isColumnHiddenByUser(colIdx)) {
          sheet.hideColumns(colIdx);
        }
      }
    });
  } catch (ignore) {}
}

function ensureColumns_(sheet) {
  const lastCol = sheet.getLastColumn();
  var finalHeaders;

  if (lastCol === 0) {
    finalHeaders = BASE_COLUMNS.concat(WEBSITE_COLUMNS);
    sheet.getRange(1, 1, 1, finalHeaders.length).setValues([finalHeaders]);
    formatAndHideColumns_(sheet, finalHeaders);
    return finalHeaders;
  }

  const headerRange = sheet.getRange(1, 1, 1, lastCol);
  const headers = headerRange.getValues()[0].map(function (h) {
    return String(h || '').trim();
  });

  const missing = WEBSITE_COLUMNS.filter(function (col) {
    return headers.indexOf(col) === -1;
  });

  if (missing.length > 0) {
    const startCol = headers.length + 1;
    sheet.getRange(1, startCol, 1, missing.length).setValues([missing]);
    finalHeaders = headers.concat(missing);
  } else {
    finalHeaders = headers;
  }

  formatAndHideColumns_(sheet, finalHeaders);
  return finalHeaders;
}

function formatCellValue_(val, timeZone) {
  if (val instanceof Date) {
    return Utilities.formatDate(val, timeZone, 'yyyy-MM-dd');
  }
  if (val === null || val === undefined) {
    return '';
  }
  return val;
}

function normalizeWatched_(val) {
  if (val === true) return true;
  if (typeof val === 'number') return val === 1;
  const s = String(val || '').trim().toLowerCase();
  return s === 'true' || s === 'yes' || s === 'watched' || s === '1' || s === 'x';
}

function jsonResponse_(payload) {
  return ContentService
    .createTextOutput(JSON.stringify(payload))
    .setMimeType(ContentService.MimeType.JSON);
}

function doGet(e) {
  try {
    const sheet = getTargetSheet_();
    const headers = ensureColumns_(sheet);
    const lastRow = sheet.getLastRow();

    if (lastRow <= 1) {
      return jsonResponse_({ ok: true, items: [], headers: headers });
    }

    const timeZone = sheet.getParent().getSpreadsheetTimeZone() || Session.getScriptTimeZone();
    const values = sheet.getRange(2, 1, lastRow - 1, headers.length).getValues();
    const items = [];

    for (var i = 0; i < values.length; i++) {
      var row = values[i];
      var record = { rowIndex: i + 2 };
      var hasContent = false;

      for (var c = 0; c < headers.length; c++) {
        var header = headers[c];
        if (!header) continue;
        var cellVal = formatCellValue_(row[c], timeZone);
        if (String(cellVal).trim() !== '') {
          hasContent = true;
        }
        if (header === 'Watched' || header === 'Ray Watched' || header === 'Isa Watched') {
          record[header] = normalizeWatched_(cellVal);
        } else {
          record[header] = cellVal;
        }
      }

      if (hasContent && String(record['Title'] || '').trim() !== '') {
        items.push(record);
      }
    }

    return jsonResponse_({
      ok: true,
      items: items,
      headers: headers,
      spreadsheetId: sheet.getParent().getId()
    });
  } catch (err) {
    return jsonResponse_({ ok: false, error: err.message });
  }
}

function findTargetRow_(sheet, headers, title, rowIndex) {
  const lastRow = sheet.getLastRow();
  if (lastRow <= 1) return -1;

  const titleColIdx = headers.indexOf('Title');
  const normalizedTarget = String(title || '').trim().toLowerCase();

  if (titleColIdx !== -1 && normalizedTarget) {
    const titleValues = sheet.getRange(2, titleColIdx + 1, lastRow - 1, 1).getValues();
    for (var i = 0; i < titleValues.length; i++) {
      var cellText = String(titleValues[i][0] || '').trim().toLowerCase();
      if (cellText === normalizedTarget || cellText.endsWith(': ' + normalizedTarget)) {
        return i + 2;
      }
    }
  }

  if (rowIndex && rowIndex >= 2 && rowIndex <= lastRow) {
    return Number(rowIndex);
  }

  return -1;
}

function resolveTargetRows_(sheet, headers, payload) {
  const lastRow = sheet.getLastRow();
  const rows = [];
  const seen = {};

  function addRow(num) {
    var n = Number(num);
    if (n >= 2 && n <= lastRow && !seen[n]) {
      seen[n] = true;
      rows.push(n);
    }
  }

  if (Array.isArray(payload.rowIndices)) {
    payload.rowIndices.forEach(addRow);
  }

  var matchedRow = findTargetRow_(sheet, headers, payload.title, payload.rowIndex);
  if (matchedRow !== -1) {
    addRow(matchedRow);
  }

  return rows;
}

function doPost(e) {
  const lock = LockService.getScriptLock();
  try {
    lock.waitLock(10000);
    const raw = (e && e.postData && e.postData.contents) ? e.postData.contents : '{}';
    const payload = JSON.parse(raw);
    const action = payload.action;

    const sheet = getTargetSheet_();
    const headers = ensureColumns_(sheet);
    const targetRows = resolveTargetRows_(sheet, headers, payload);

    if (targetRows.length === 0) {
      return jsonResponse_({ ok: false, error: 'Row not found for title: ' + (payload.title || '') });
    }

    const timeZone = sheet.getParent().getSpreadsheetTimeZone() || Session.getScriptTimeZone();

    if (action === 'toggleWatched') {
      const watchedCol = headers.indexOf('Watched') + 1;
      const rayWatchedCol = headers.indexOf('Ray Watched') + 1;
      const isaWatchedCol = headers.indexOf('Isa Watched') + 1;
      const watchedDateCol = headers.indexOf('Watched Date') + 1;

      const rayWatched = payload.rayWatched !== undefined ? Boolean(payload.rayWatched) : Boolean(payload.watched);
      const isaWatched = payload.isaWatched !== undefined ? Boolean(payload.isaWatched) : Boolean(payload.watched);
      const isWatched = payload.watched !== undefined ? Boolean(payload.watched) : (rayWatched && isaWatched);
      const watchedDate = (isWatched || rayWatched || isaWatched)
        ? (payload.watchedDate || Utilities.formatDate(new Date(), timeZone, 'yyyy-MM-dd'))
        : '';

      targetRows.forEach(function (targetRow) {
        if (watchedCol > 0) {
          sheet.getRange(targetRow, watchedCol).setValue(isWatched ? 'TRUE' : 'FALSE');
        }
        if (rayWatchedCol > 0) {
          sheet.getRange(targetRow, rayWatchedCol).setValue(rayWatched ? 'TRUE' : 'FALSE');
        }
        if (isaWatchedCol > 0) {
          sheet.getRange(targetRow, isaWatchedCol).setValue(isaWatched ? 'TRUE' : 'FALSE');
        }
        if (watchedDateCol > 0) {
          sheet.getRange(targetRow, watchedDateCol).setValue(watchedDate);
        }
      });

      return jsonResponse_({
        ok: true,
        updated: {
          rowIndex: targetRows[0],
          rowIndices: targetRows,
          title: payload.title,
          watched: isWatched,
          rayWatched: rayWatched,
          isaWatched: isaWatched,
          watchedDate: watchedDate
        }
      });
    }

    if (action === 'cacheMetadata') {
      const fields = [
        { header: 'Poster URL', value: payload.posterUrl },
        { header: 'Year', value: payload.year },
        { header: 'Genre', value: payload.genre },
        { header: 'Runtime', value: payload.runtime }
      ];
      const force = Boolean(payload.force);
      const updatedFields = {};

      targetRows.forEach(function (targetRow) {
        fields.forEach(function (field) {
          if (field.value === undefined || field.value === null || String(field.value).trim() === '') {
            return;
          }
          var colIdx = headers.indexOf(field.header) + 1;
          if (colIdx <= 0) return;

          var cell = sheet.getRange(targetRow, colIdx);
          var existing = String(cell.getValue() || '').trim();
          if (force || existing === '') {
            cell.setValue(String(field.value).trim());
            updatedFields[field.header] = String(field.value).trim();
          }
        });
      });

      return jsonResponse_({
        ok: true,
        updated: {
          rowIndex: targetRows[0],
          rowIndices: targetRows,
          title: payload.title,
          fields: updatedFields
        }
      });
    }

    return jsonResponse_({ ok: false, error: 'Unknown action: ' + action });
  } catch (err) {
    return jsonResponse_({ ok: false, error: err.message });
  } finally {
    try {
      lock.releaseLock();
    } catch (ignore) {}
  }
}
