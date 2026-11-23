(() => {
  'use strict';

  const SPREADSHEET_ID = '18dMxzqimum6c4KfF7TgD0wZfmqXbjCYTAxxGHoTxvCg';
  const DEFAULT_GAS_URL = '';
  const STORAGE_KEYS = {
    SETTINGS: 'seer_cinema_settings_v1',
    METADATA_CACHE: 'seer_metadata_cache_v2',
    DEMO_OVERRIDES: 'seer_demo_overrides_v1',
    BANNER_DISMISSED: 'seer_banner_dismissed_v1'
  };

  // Snapshot of Ray & Isa's live Google Sheet catalog used when no /exec Web App URL is configured yet
  const DEMO_ITEMS = [
    {"rowIndex":2,"Date Requested":"2026-07-12","Title":"Series Request Now Available: Love Between Fairy and Devil (2022)","Media Type":"TV Show","Season(s) / Quality":1,"Request Status":"Available","Added to Plex Date":"2026-07-12","Requested By":"isabellapark66","Watched":false,"Watched Date":"","Poster URL":"","Year":"","Genre":"","Runtime":""},
    {"rowIndex":3,"Date Requested":"2026-07-13","Title":"Series Request Approved: Young Ladies Don't Play Fighting Games (2026)","Media Type":"TV Show","Season(s) / Quality":1,"Request Status":"Approved","Added to Plex Date":"-","Requested By":"isabellapark66","Watched":false,"Watched Date":"","Poster URL":"","Year":"","Genre":"","Runtime":""},
    {"rowIndex":4,"Date Requested":"2026-07-13","Title":"Series Request Now Available: Adam's Sweet Agony (2024)","Media Type":"TV Show","Season(s) / Quality":1,"Request Status":"Available","Added to Plex Date":"2026-07-13","Requested By":"isabellapark66","Watched":false,"Watched Date":"","Poster URL":"","Year":"","Genre":"","Runtime":""},
    {"rowIndex":5,"Date Requested":"2026-07-15","Title":"Movie Request Approved: Nymphomaniac: Vol. II (2013)","Media Type":"Movie","Season(s) / Quality":"-","Request Status":"Approved","Added to Plex Date":"-","Requested By":"isabellapark66","Watched":false,"Watched Date":"","Poster URL":"","Year":"","Genre":"","Runtime":""},
    {"rowIndex":6,"Date Requested":"2026-07-15","Title":"Movie Request Approved: Nymphomaniac: Vol. I (2013)","Media Type":"Movie","Season(s) / Quality":"-","Request Status":"Approved","Added to Plex Date":"-","Requested By":"isabellapark66","Watched":false,"Watched Date":"","Poster URL":"","Year":"","Genre":"","Runtime":""},
    {"rowIndex":7,"Date Requested":"2026-07-15","Title":"Movie Request Now Available: Nymphomaniac: Vol. II (2013)","Media Type":"Movie","Season(s) / Quality":"-","Request Status":"Available","Added to Plex Date":"2026-07-15","Requested By":"isabellapark66","Watched":false,"Watched Date":"","Poster URL":"","Year":"","Genre":"","Runtime":""},
    {"rowIndex":8,"Date Requested":"2026-07-15","Title":"Movie Request Now Available: Nymphomaniac: Vol. I (2013)","Media Type":"Movie","Season(s) / Quality":"-","Request Status":"Available","Added to Plex Date":"2026-07-15","Requested By":"isabellapark66","Watched":false,"Watched Date":"","Poster URL":"","Year":"","Genre":"","Runtime":""},
    {"rowIndex":9,"Date Requested":"2026-07-19","Title":"Movie Request Now Available: Good Boy (2025)","Media Type":"Movie","Season(s) / Quality":"-","Request Status":"Available","Added to Plex Date":"2026-07-19","Requested By":"isabellapark66","Watched":false,"Watched Date":"","Poster URL":"","Year":"","Genre":"","Runtime":""},
    {"rowIndex":10,"Date Requested":"2026-07-25","Title":"Movie Request Now Available: The Odyssey (2026)","Media Type":"Movie","Season(s) / Quality":"-","Request Status":"Available","Added to Plex Date":"2026-07-25","Requested By":"isabellapark66","Watched":false,"Watched Date":"","Poster URL":"","Year":"","Genre":"","Runtime":""},
    {"rowIndex":11,"Date Requested":"2026-07-25","Title":"Series Request Now Available: Sherlock Holmes in the 22nd Century (1999)","Media Type":"TV Show","Season(s) / Quality":"2026-01-02","Request Status":"Available","Added to Plex Date":"2026-07-25","Requested By":"isabellapark66","Watched":false,"Watched Date":"","Poster URL":"","Year":"","Genre":"","Runtime":""},
    {"rowIndex":12,"Date Requested":"2026-07-26","Title":"Movie Request Now Available: BloodRayne (2005)","Media Type":"Movie","Season(s) / Quality":"-","Request Status":"Available","Added to Plex Date":"2026-07-26","Requested By":"isabellapark66","Watched":false,"Watched Date":"","Poster URL":"","Year":"","Genre":"","Runtime":""},
    {"rowIndex":13,"Date Requested":"2026-07-26","Title":"Movie Request Now Available: BloodRayne II: Deliverance (2007)","Media Type":"Movie","Season(s) / Quality":"-","Request Status":"Available","Added to Plex Date":"2026-07-26","Requested By":"isabellapark66","Watched":false,"Watched Date":"","Poster URL":"","Year":"","Genre":"","Runtime":""},
    {"rowIndex":14,"Date Requested":"2026-07-26","Title":"Movie Request Now Available: BloodRayne: The Third Reich (2010)","Media Type":"Movie","Season(s) / Quality":"-","Request Status":"Available","Added to Plex Date":"2026-07-26","Requested By":"isabellapark66","Watched":false,"Watched Date":"","Poster URL":"","Year":"","Genre":"","Runtime":""},
    {"rowIndex":15,"Date Requested":"2026-07-26","Title":"Movie Request Now Available: Underworld (2003)","Media Type":"Movie","Season(s) / Quality":"-","Request Status":"Available","Added to Plex Date":"2026-07-26","Requested By":"isabellapark66","Watched":false,"Watched Date":"","Poster URL":"","Year":"","Genre":"","Runtime":""},
    {"rowIndex":16,"Date Requested":"2026-07-26","Title":"Movie Request Now Available: Underworld: Rise of the Lycans (2009)","Media Type":"Movie","Season(s) / Quality":"-","Request Status":"Available","Added to Plex Date":"2026-07-26","Requested By":"isabellapark66","Watched":false,"Watched Date":"","Poster URL":"","Year":"","Genre":"","Runtime":""},
    {"rowIndex":17,"Date Requested":"2026-07-26","Title":"Movie Request Now Available: Queens of the Dead (2025)","Media Type":"Movie","Season(s) / Quality":"-","Request Status":"Available","Added to Plex Date":"2026-07-26","Requested By":"isabellapark66","Watched":false,"Watched Date":"","Poster URL":"","Year":"","Genre":"","Runtime":""},
    {"rowIndex":18,"Date Requested":"2026-07-26","Title":"Movie Request Now Available: Underworld: Awakening (2012)","Media Type":"Movie","Season(s) / Quality":"-","Request Status":"Available","Added to Plex Date":"2026-07-26","Requested By":"isabellapark66","Watched":false,"Watched Date":"","Poster URL":"","Year":"","Genre":"","Runtime":""},
    {"rowIndex":19,"Date Requested":"2026-07-26","Title":"Series Request Now Available: Sonic X (2003)","Media Type":"TV Show","Season(s) / Quality":"2003-01-02","Request Status":"Available","Added to Plex Date":"2026-07-26","Requested By":"isabellapark66","Watched":false,"Watched Date":"","Poster URL":"","Year":"","Genre":"","Runtime":""},
    {"rowIndex":20,"Date Requested":"2026-07-26","Title":"Movie Request Now Available: Underworld: Evolution (2006)","Media Type":"Movie","Season(s) / Quality":"-","Request Status":"Available","Added to Plex Date":"2026-07-26","Requested By":"isabellapark66","Watched":false,"Watched Date":"","Poster URL":"","Year":"","Genre":"","Runtime":""},
    {"rowIndex":21,"Date Requested":"2026-07-26","Title":"Series Request Now Available: W: Two Worlds Apart (2016)","Media Type":"TV Show","Season(s) / Quality":1,"Request Status":"Available","Added to Plex Date":"2026-07-26","Requested By":"isabellapark66","Watched":false,"Watched Date":"","Poster URL":"","Year":"","Genre":"","Runtime":""},
    {"rowIndex":22,"Date Requested":"2026-07-26","Title":"Series Request Now Available: Like a Dragon: Yakuza (2024)","Media Type":"TV Show","Season(s) / Quality":1,"Request Status":"Available","Added to Plex Date":"2026-07-26","Requested By":"isabellapark66","Watched":false,"Watched Date":"","Poster URL":"","Year":"","Genre":"","Runtime":""},
    {"rowIndex":23,"Date Requested":"2026-07-26","Title":"Series Request Now Available: The Girlfriend Experience (2016)","Media Type":"TV Show","Season(s) / Quality":1,"Request Status":"Available","Added to Plex Date":"2026-07-26","Requested By":"isabellapark66","Watched":false,"Watched Date":"","Poster URL":"","Year":"","Genre":"","Runtime":""},
    {"rowIndex":24,"Date Requested":"2026-07-26","Title":"Series Request Now Available: The Qwaser of Stigmata (2010)","Media Type":"TV Show","Season(s) / Quality":"2026-01-02","Request Status":"Available","Added to Plex Date":"2026-07-26","Requested By":"isabellapark66","Watched":false,"Watched Date":"","Poster URL":"","Year":"","Genre":"","Runtime":""},
    {"rowIndex":25,"Date Requested":"2026-07-31","Title":"Movie Request Now Available: Re-Animator (1985)","Media Type":"Movie","Season(s) / Quality":"-","Request Status":"Available","Added to Plex Date":"2026-07-31","Requested By":"blueblur77","Watched":false,"Watched Date":"","Poster URL":"","Year":"","Genre":"","Runtime":""},
    {"rowIndex":26,"Date Requested":"2026-07-31","Title":"Movie Request Now Available: Helter Skelter (1976)","Media Type":"Movie","Season(s) / Quality":"-","Request Status":"Available","Added to Plex Date":"2026-07-31","Requested By":"blueblur77","Watched":false,"Watched Date":"","Poster URL":"","Year":"","Genre":"","Runtime":""},
    {"rowIndex":27,"Date Requested":"2026-07-31","Title":"Movie Request Now Available: X (2022)","Media Type":"Movie","Season(s) / Quality":"-","Request Status":"Available","Added to Plex Date":"2026-07-31","Requested By":"isabellapark66","Watched":false,"Watched Date":"","Poster URL":"","Year":"","Genre":"","Runtime":""},
    {"rowIndex":28,"Date Requested":"2026-08-01","Title":"Movie Request Now Available: Blink Twice (2024)","Media Type":"Movie","Season(s) / Quality":"-","Request Status":"Available","Added to Plex Date":"2026-08-01","Requested By":"isabellapark66","Watched":false,"Watched Date":"","Poster URL":"","Year":"","Genre":"","Runtime":""},
    {"rowIndex":29,"Date Requested":"2026-08-26","Title":"Movie Request Now Available: Phone Booth (2003)","Media Type":"Movie","Season(s) / Quality":"-","Request Status":"Available","Added to Plex Date":"2026-08-26","Requested By":"blueblur77","Watched":false,"Watched Date":"","Poster URL":"","Year":"","Genre":"","Runtime":""},
    {"rowIndex":30,"Date Requested":"2026-09-01","Title":"Movie Request Now Available: Colony (2026)","Media Type":"Movie","Season(s) / Quality":"-","Request Status":"Available","Added to Plex Date":"2026-09-01","Requested By":"isabellapark66","Watched":false,"Watched Date":"","Poster URL":"","Year":"","Genre":"","Runtime":""},
    {"rowIndex":31,"Date Requested":"2026-09-01","Title":"Series Request Now Available: Agent Kim Reactivated (2026)","Media Type":"TV Show","Season(s) / Quality":1,"Request Status":"Available","Added to Plex Date":"2026-09-01","Requested By":"isabellapark66","Watched":false,"Watched Date":"","Poster URL":"","Year":"","Genre":"","Runtime":""},
    {"rowIndex":32,"Date Requested":"2026-09-01","Title":"Series Request Now Available: Inspector Koo (2021)","Media Type":"TV Show","Season(s) / Quality":1,"Request Status":"Available","Added to Plex Date":"2026-09-01","Requested By":"isabellapark66","Watched":false,"Watched Date":"","Poster URL":"","Year":"","Genre":"","Runtime":""},
    {"rowIndex":33,"Date Requested":"2026-09-04","Title":"Series Request Now Available: Mousetrap (2026)","Media Type":"TV Show","Season(s) / Quality":1,"Request Status":"Available","Added to Plex Date":"2026-09-04","Requested By":"isabellapark66","Watched":false,"Watched Date":"","Poster URL":"","Year":"","Genre":"","Runtime":""},
    {"rowIndex":34,"Date Requested":"2026-09-04","Title":"Series Request Now Available: The Girlfriend Experience (2016)","Media Type":"TV Show","Season(s) / Quality":"2026-02-03","Request Status":"Available","Added to Plex Date":"2026-09-04","Requested By":"isabellapark66","Watched":false,"Watched Date":"","Poster URL":"","Year":"","Genre":"","Runtime":""},
    {"rowIndex":35,"Date Requested":"2026-09-06","Title":"Series Request Now Available: Baby (2018)","Media Type":"TV Show","Season(s) / Quality":1,"Request Status":"Available","Added to Plex Date":"2026-09-06","Requested By":"isabellapark66","Watched":false,"Watched Date":"","Poster URL":"","Year":"","Genre":"","Runtime":""},
    {"rowIndex":36,"Date Requested":"2026-09-06","Title":"Movie Request Now Available: Tangerine (2015)","Media Type":"Movie","Season(s) / Quality":"-","Request Status":"Available","Added to Plex Date":"2026-09-06","Requested By":"isabellapark66","Watched":false,"Watched Date":"","Poster URL":"","Year":"","Genre":"","Runtime":""},
    {"rowIndex":37,"Date Requested":"2026-09-06","Title":"Movie Request Now Available: Anora (2024)","Media Type":"Movie","Season(s) / Quality":"-","Request Status":"Available","Added to Plex Date":"2026-09-06","Requested By":"isabellapark66","Watched":false,"Watched Date":"","Poster URL":"","Year":"","Genre":"","Runtime":""},
    {"rowIndex":38,"Date Requested":"2026-09-06","Title":"Movie Request Now Available: Buddy (2026)","Media Type":"Movie","Season(s) / Quality":"-","Request Status":"Available","Added to Plex Date":"2026-09-06","Requested By":"isabellapark66","Watched":false,"Watched Date":"","Poster URL":"","Year":"","Genre":"","Runtime":""},
    {"rowIndex":39,"Date Requested":"2026-09-07","Title":"Movie Request Now Available: Mirrors (2008)","Media Type":"Movie","Season(s) / Quality":"-","Request Status":"Available","Added to Plex Date":"2026-09-07","Requested By":"isabellapark66","Watched":false,"Watched Date":"","Poster URL":"","Year":"","Genre":"","Runtime":""},
    {"rowIndex":40,"Date Requested":"2026-09-07","Title":"Movie Request Now Available: In the Tall Grass (2019)","Media Type":"Movie","Season(s) / Quality":"-","Request Status":"Available","Added to Plex Date":"2026-09-07","Requested By":"isabellapark66","Watched":false,"Watched Date":"","Poster URL":"","Year":"","Genre":"","Runtime":""},
    {"rowIndex":41,"Date Requested":"2026-09-11","Title":"Series Request Now Available: S Line (2025)","Media Type":"TV Show","Season(s) / Quality":1,"Request Status":"Available","Added to Plex Date":"2026-09-11","Requested By":"isabellapark66","Watched":false,"Watched Date":"","Poster URL":"","Year":"","Genre":"","Runtime":""},
    {"rowIndex":42,"Date Requested":"2026-09-18","Title":"Series Request Now Available: KAMUI: He's Behind You (2026)","Media Type":"TV Show","Season(s) / Quality":1,"Request Status":"Available","Added to Plex Date":"2026-09-18","Requested By":"isabellapark66","Watched":false,"Watched Date":"","Poster URL":"","Year":"","Genre":"","Runtime":""},
    {"rowIndex":43,"Date Requested":"2026-09-24","Title":"Movie Request Now Available: Belladonna of Sadness (1973)","Media Type":"Movie","Season(s) / Quality":"-","Request Status":"Available","Added to Plex Date":"2026-09-24","Requested By":"isabellapark66","Watched":false,"Watched Date":"","Poster URL":"","Year":"","Genre":"","Runtime":""},
    {"rowIndex":44,"Date Requested":"2026-09-24","Title":"Movie Request Now Available: Bring Her Back (2025)","Media Type":"Movie","Season(s) / Quality":"-","Request Status":"Available","Added to Plex Date":"2026-09-24","Requested By":"isabellapark66","Watched":false,"Watched Date":"","Poster URL":"","Year":"","Genre":"","Runtime":""},
    {"rowIndex":45,"Date Requested":"2026-09-24","Title":"Series Request Now Available: Smoking Behind the Supermarket with You (2026)","Media Type":"TV Show","Season(s) / Quality":1,"Request Status":"Available","Added to Plex Date":"2026-09-24","Requested By":"isabellapark66","Watched":false,"Watched Date":"","Poster URL":"","Year":"","Genre":"","Runtime":""},
    {"rowIndex":46,"Date Requested":"2026-09-26","Title":"Series Request Now Available: Climax (2026)","Media Type":"TV Show","Season(s) / Quality":1,"Request Status":"Available","Added to Plex Date":"2026-09-26","Requested By":"isabellapark66","Watched":false,"Watched Date":"","Poster URL":"","Year":"","Genre":"","Runtime":""},
    {"rowIndex":47,"Date Requested":"2026-09-26","Title":"Series Request Now Available: The Scandal (2026)","Media Type":"TV Show","Season(s) / Quality":1,"Request Status":"Available","Added to Plex Date":"2026-09-26","Requested By":"isabellapark66","Watched":false,"Watched Date":"","Poster URL":"","Year":"","Genre":"","Runtime":""},
    {"rowIndex":48,"Date Requested":"2026-09-28","Title":"Movie Request Now Available: Murderer Report (2025)","Media Type":"Movie","Season(s) / Quality":"-","Request Status":"Available","Added to Plex Date":"2026-09-28","Requested By":"isabellapark66","Watched":false,"Watched Date":"","Poster URL":"","Year":"","Genre":"","Runtime":""},
    {"rowIndex":49,"Date Requested":"2026-09-28","Title":"Movie Request Now Available: Huesera: The Bone Woman (2023)","Media Type":"Movie","Season(s) / Quality":"-","Request Status":"Available","Added to Plex Date":"2026-09-28","Requested By":"isabellapark66","Watched":false,"Watched Date":"","Poster URL":"","Year":"","Genre":"","Runtime":""},
    {"rowIndex":50,"Date Requested":"2026-09-28","Title":"Movie Request Now Available: White: Melody of Death (2011)","Media Type":"Movie","Season(s) / Quality":"-","Request Status":"Available","Added to Plex Date":"2026-09-28","Requested By":"isabellapark66","Watched":false,"Watched Date":"","Poster URL":"","Year":"","Genre":"","Runtime":""},
    {"rowIndex":51,"Date Requested":"2026-09-28","Title":"Series Request Now Available: Taxi Driver (2021)","Media Type":"TV Show","Season(s) / Quality":"2003-01-02","Request Status":"Available","Added to Plex Date":"2026-09-28","Requested By":"isabellapark66","Watched":false,"Watched Date":"","Poster URL":"","Year":"","Genre":"","Runtime":""},
    {"rowIndex":52,"Date Requested":"2026-10-03","Title":"Series Request Now Available: Light Beyond the Reed (2025)","Media Type":"TV Show","Season(s) / Quality":1,"Request Status":"Available","Added to Plex Date":"2026-10-03","Requested By":"isabellapark66","Watched":false,"Watched Date":"","Poster URL":"","Year":"","Genre":"","Runtime":""},
    {"rowIndex":53,"Date Requested":"2026-10-10","Title":"Series Request Now Available: Take Charge of My Heart (2026)","Media Type":"TV Show","Season(s) / Quality":1,"Request Status":"Available","Added to Plex Date":"2026-10-10","Requested By":"isabellapark66","Watched":false,"Watched Date":"","Poster URL":"","Year":"","Genre":"","Runtime":""},
    {"rowIndex":54,"Date Requested":"2026-10-13","Title":"Movie Request Now Available: Hope (2026)","Media Type":"Movie","Season(s) / Quality":"-","Request Status":"Available","Added to Plex Date":"2026-10-13","Requested By":"isabellapark66","Watched":false,"Watched Date":"","Poster URL":"","Year":"","Genre":"","Runtime":""},
    {"rowIndex":55,"Date Requested":"2026-11-12","Title":"Movie Request Now Available: Other Mommy (2026)","Media Type":"Movie","Season(s) / Quality":"-","Request Status":"Available","Added to Plex Date":"2026-11-12","Requested By":"isabellapark66","Watched":false,"Watched Date":"","Poster URL":"","Year":"","Genre":"","Runtime":""},
    {"rowIndex":56,"Date Requested":"2026-11-12","Title":"Movie Request Now Available: Primetime (2026)","Media Type":"Movie","Season(s) / Quality":"-","Request Status":"Available","Added to Plex Date":"2026-11-12","Requested By":"isabellapark66","Watched":false,"Watched Date":"","Poster URL":"","Year":"","Genre":"","Runtime":""},
    {"rowIndex":57,"Date Requested":"2026-11-13","Title":"Movie Request Now Available: The Gangster, the Cop, the Devil (2019)","Media Type":"Movie","Season(s) / Quality":"-","Request Status":"Available","Added to Plex Date":"2026-11-13","Requested By":"isabellapark66","Watched":false,"Watched Date":"","Poster URL":"","Year":"","Genre":"","Runtime":""},
    {"rowIndex":58,"Date Requested":"2026-11-13","Title":"Movie Request Now Available: The Handmaiden (2016)","Media Type":"Movie","Season(s) / Quality":"-","Request Status":"Available","Added to Plex Date":"2026-11-13","Requested By":"isabellapark66","Watched":false,"Watched Date":"","Poster URL":"","Year":"","Genre":"","Runtime":""},
    {"rowIndex":59,"Date Requested":"2026-11-13","Title":"Movie Request Now Available: The Chaser (2008)","Media Type":"Movie","Season(s) / Quality":"-","Request Status":"Available","Added to Plex Date":"2026-11-13","Requested By":"isabellapark66","Watched":false,"Watched Date":"","Poster URL":"","Year":"","Genre":"","Runtime":""},
    {"rowIndex":60,"Date Requested":"2026-11-13","Title":"Movie Request Now Available: Queen of the Damned (2002)","Media Type":"Movie","Season(s) / Quality":"-","Request Status":"Available","Added to Plex Date":"2026-11-13","Requested By":"isabellapark66","Watched":false,"Watched Date":"","Poster URL":"","Year":"","Genre":"","Runtime":""},
    {"rowIndex":61,"Date Requested":"2026-11-13","Title":"Series Request Now Available: Twelve (2025)","Media Type":"TV Show","Season(s) / Quality":1,"Request Status":"Available","Added to Plex Date":"2026-11-13","Requested By":"isabellapark66","Watched":false,"Watched Date":"","Poster URL":"","Year":"","Genre":"","Runtime":""},
    {"rowIndex":62,"Date Requested":"2026-11-13","Title":"Movie Request Now Available: Oldboy (2003)","Media Type":"Movie","Season(s) / Quality":"-","Request Status":"Available","Added to Plex Date":"2026-11-13","Requested By":"isabellapark66","Watched":false,"Watched Date":"","Poster URL":"","Year":"","Genre":"","Runtime":""},
    {"rowIndex":63,"Date Requested":"2026-11-13","Title":"Movie Request Now Available: Romeo Must Die (2000)","Media Type":"Movie","Season(s) / Quality":"-","Request Status":"Available","Added to Plex Date":"2026-11-13","Requested By":"isabellapark66","Watched":false,"Watched Date":"","Poster URL":"","Year":"","Genre":"","Runtime":""},
    {"rowIndex":64,"Date Requested":"2026-11-13","Title":"Movie Request Now Available: Cradle 2 the Grave (2003)","Media Type":"Movie","Season(s) / Quality":"-","Request Status":"Available","Added to Plex Date":"2026-11-13","Requested By":"isabellapark66","Watched":false,"Watched Date":"","Poster URL":"","Year":"","Genre":"","Runtime":""},
    {"rowIndex":65,"Date Requested":"2026-11-19","Title":"Movie Request Approved: Exit 8 (2025)","Media Type":"Movie","Season(s) / Quality":"-","Request Status":"Approved","Added to Plex Date":"-","Requested By":"blueblur77","Watched":false,"Watched Date":"","Poster URL":"","Year":"","Genre":"","Runtime":""},
    {"rowIndex":66,"Date Requested":"2026-11-19","Title":"Movie Request Now Available: Exit 8 (2025)","Media Type":"Movie","Season(s) / Quality":"-","Request Status":"Available","Added to Plex Date":"2026-11-19","Requested By":"blueblur77","Watched":false,"Watched Date":"","Poster URL":"","Year":"","Genre":"","Runtime":""},
    {"rowIndex":67,"Date Requested":"2026-11-20","Title":"Movie Request Automatically Approved: Creed (2015)","Media Type":"Movie","Season(s) / Quality":"-","Request Status":"Approved","Added to Plex Date":"-","Requested By":"blueblur77","Watched":false,"Watched Date":"","Poster URL":"","Year":"","Genre":"","Runtime":""},
    {"rowIndex":68,"Date Requested":"2026-11-20","Title":"Movie Request Automatically Approved: Creed II (2018)","Media Type":"Movie","Season(s) / Quality":"-","Request Status":"Approved","Added to Plex Date":"-","Requested By":"blueblur77","Watched":false,"Watched Date":"","Poster URL":"","Year":"","Genre":"","Runtime":""},
    {"rowIndex":69,"Date Requested":"2026-11-20","Title":"Movie Request Automatically Approved: Creed III (2023)","Media Type":"Movie","Season(s) / Quality":"-","Request Status":"Approved","Added to Plex Date":"-","Requested By":"blueblur77","Watched":false,"Watched Date":"","Poster URL":"","Year":"","Genre":"","Runtime":""},
    {"rowIndex":70,"Date Requested":"2026-11-20","Title":"Movie Request Now Available: Creed II (2018)","Media Type":"Movie","Season(s) / Quality":"-","Request Status":"Available","Added to Plex Date":"2026-11-20","Requested By":"blueblur77","Watched":false,"Watched Date":"","Poster URL":"","Year":"","Genre":"","Runtime":""},
    {"rowIndex":71,"Date Requested":"2026-11-20","Title":"Movie Request Now Available: Creed (2015)","Media Type":"Movie","Season(s) / Quality":"-","Request Status":"Available","Added to Plex Date":"2026-11-20","Requested By":"blueblur77","Watched":false,"Watched Date":"","Poster URL":"","Year":"","Genre":"","Runtime":""},
    {"rowIndex":72,"Date Requested":"2026-11-20","Title":"Movie Request Now Available: Creed III (2023)","Media Type":"Movie","Season(s) / Quality":"-","Request Status":"Available","Added to Plex Date":"2026-11-20","Requested By":"blueblur77","Watched":false,"Watched Date":"","Poster URL":"","Year":"","Genre":"","Runtime":""}
  ];

  const TMDB_GENRES = {
    28: 'Action', 12: 'Adventure', 16: 'Animation', 35: 'Comedy', 80: 'Crime',
    99: 'Documentary', 18: 'Drama', 10751: 'Family', 14: 'Fantasy', 36: 'History',
    27: 'Horror', 10402: 'Music', 9648: 'Mystery', 10749: 'Romance', 878: 'Sci-Fi',
    10770: 'TV Movie', 53: 'Thriller', 10752: 'War', 37: 'Western',
    10759: 'Action & Adventure', 10765: 'Sci-Fi & Fantasy'
  };

  const state = {
    view: 'unwatched', // 'unwatched' | 'watched'
    requesterFilter: 'all', // 'all' | 'ray' | 'isa'
    typeFilter: 'all', // 'all' | 'movie' | 'tv'
    watchFilter: 'tab', // 'tab' | 'neither' | 'ray-only' | 'isa-only' | 'both'
    searchQuery: '',
    sortBy: 'newest', // 'newest' | 'title' | 'year'
    connectionMode: 'demo', // 'live' | 'readonly' | 'demo'
    items: [],
    selectedItemKey: null,
    settings: loadSettings(),
    metadataCache: loadJsonStorage(STORAGE_KEYS.METADATA_CACHE, {}),
    demoOverrides: loadJsonStorage(STORAGE_KEYS.DEMO_OVERRIDES, {}),
    fetchingKeys: new Set()
  };

  // DOM References
  const dom = {
    navUnwatched: document.getElementById('nav-unwatched'),
    navWatched: document.getElementById('nav-watched'),
    countUnwatched: document.getElementById('count-unwatched'),
    countWatched: document.getElementById('count-watched'),
    btnRefresh: document.getElementById('btn-refresh'),
    btnSettings: document.getElementById('btn-settings'),
    connectionDot: document.getElementById('connection-dot'),
    connectionLabel: document.getElementById('connection-label'),
    setupBanner: document.getElementById('setup-banner'),
    btnOpenSetup: document.getElementById('btn-open-setup'),
    btnDismissBanner: document.getElementById('btn-dismiss-banner'),
    viewTitle: document.getElementById('view-title'),
    viewSubtitle: document.getElementById('view-subtitle'),
    resultsSummary: document.getElementById('results-summary'),
    searchInput: document.getElementById('search-input'),
    sortSelect: document.getElementById('sort-select'),
    loadingGrid: document.getElementById('loading-grid'),
    catalogGrid: document.getElementById('catalog-grid'),
    emptyState: document.getElementById('empty-state'),
    emptyTitle: document.getElementById('empty-title'),
    emptyDescription: document.getElementById('empty-description'),
    btnResetFilters: document.getElementById('btn-reset-filters'),
    detailModal: document.getElementById('detail-modal'),
    detailPoster: document.getElementById('detail-poster'),
    detailPosterFallback: document.getElementById('detail-poster-fallback'),
    detailRequesterBadge: document.getElementById('detail-requester-badge'),
    detailTypeBadge: document.getElementById('detail-type-badge'),
    detailStatusBadge: document.getElementById('detail-status-badge'),
    detailTitle: document.getElementById('detail-title'),
    detailMetaLine: document.getElementById('detail-meta-line'),
    detailDateRequested: document.getElementById('detail-date-requested'),
    detailPlexDate: document.getElementById('detail-plex-date'),
    detailQuality: document.getElementById('detail-quality'),
    detailWatchedDate: document.getElementById('detail-watched-date'),
    detailWatchRay: document.getElementById('detail-watch-ray'),
    detailWatchIsa: document.getElementById('detail-watch-isa'),
    detailToggleWatched: document.getElementById('detail-toggle-watched'),
    btnEditPosterToggle: document.getElementById('btn-edit-poster-toggle'),
    editPosterForm: document.getElementById('edit-poster-form'),
    inputCustomPoster: document.getElementById('input-custom-poster'),
    btnCancelPoster: document.getElementById('btn-cancel-poster'),
    settingsModal: document.getElementById('settings-modal'),
    settingsForm: document.getElementById('settings-form'),
    inputGasUrl: document.getElementById('input-gas-url'),
    inputTmdbKey: document.getElementById('input-tmdb-key'),
    inputOmdbKey: document.getElementById('input-omdb-key'),
    btnClearCache: document.getElementById('btn-clear-cache'),
    btnCopyShareLink: document.getElementById('btn-copy-share-link'),
    toastContainer: document.getElementById('toast-container')
  };

  function loadJsonStorage(key, fallback) {
    try {
      const raw = localStorage.getItem(key);
      return raw ? JSON.parse(raw) : fallback;
    } catch {
      return fallback;
    }
  }

  function saveJsonStorage(key, value) {
    try {
      localStorage.setItem(key, JSON.stringify(value));
    } catch {
      // Ignore storage quota errors
    }
  }

  function loadSettings() {
    const saved = loadJsonStorage(STORAGE_KEYS.SETTINGS, {});
    let gasUrl = String(saved.gasUrl || DEFAULT_GAS_URL || '').trim();

    try {
      const params = new URLSearchParams(window.location.search);
      const paramGas = String(params.get('gas') || '').trim();
      if (paramGas.startsWith('https://script.google.com/macros/s/')) {
        gasUrl = paramGas;
        saveJsonStorage(STORAGE_KEYS.SETTINGS, {
          ...saved,
          gasUrl
        });
        const cleanUrl = window.location.pathname + window.location.hash;
        window.history.replaceState({}, '', cleanUrl);
      }
    } catch {
      // Ignore URL parsing errors
    }

    return {
      gasUrl,
      tmdbKey: String(saved.tmdbKey || '').trim(),
      omdbKey: String(saved.omdbKey || '').trim(),
      tryPublicSheet: Boolean(saved.tryPublicSheet)
    };
  }

  function formatRequester(raw) {
    const val = String(raw || '').trim();
    const lower = val.toLowerCase();
    if (lower.includes('blueblur77') || lower === 'ray') {
      return { id: 'ray', label: 'Ray' };
    }
    if (lower.includes('isabellapark66') || lower === 'isa') {
      return { id: 'isa', label: 'Isa' };
    }
    return { id: lower || 'unknown', label: val || 'Unknown' };
  }

  function normalizeMediaType(raw) {
    const lower = String(raw || '').toLowerCase();
    if (lower.includes('tv') || lower.includes('show') || lower.includes('series')) {
      return 'TV Show';
    }
    return 'Movie';
  }

  function normalizeWatched(val) {
    if (val === true || val === 1) return true;
    const s = String(val || '').trim().toLowerCase();
    return s === 'true' || s === 'yes' || s === 'watched' || s === '1' || s === 'x';
  }

  function makeItemKey(item) {
    return `${String(item.title || '').trim().toLowerCase()}::${normalizeMediaType(item.mediaType)}`;
  }

  function cleanTitleForSearch(rawTitle) {
    const original = String(rawTitle || '').trim();
    const yearMatch = original.match(/\((\d{4})\)/);
    const cleaned = original
      .replace(/\(\d{4}\)/g, '')
      .replace(/\[[^\]]*\]/g, '')
      .replace(/\s+/g, ' ')
      .trim();
    return {
      cleaned: cleaned || original,
      yearHint: yearMatch ? yearMatch[1] : ''
    };
  }

  function formatRuntimeMinutes(mins) {
    const total = Number(mins);
    if (!Number.isFinite(total) || total <= 0) return '';
    if (total < 60) return `${Math.round(total)}m`;
    const h = Math.floor(total / 60);
    const m = Math.round(total % 60);
    return m > 0 ? `${h}h ${m}m` : `${h}h`;
  }

  function parseSeerrTitle(rawTitle) {
    const sheetTitle = String(rawTitle || '').trim();
    const strippedPrefix = sheetTitle.replace(
      /^(?:movie|series|tv(?:\s+show)?|show)\s+request\s+(?:now\s+available|automatically\s+approved|approved|pending|declined|failed|available)\s*:\s*/i,
      ''
    ).trim();
    const yearMatch = strippedPrefix.match(/\((\d{4})\)\s*$/);
    const displayTitle = strippedPrefix.replace(/\s*\(\d{4}\)\s*$/, '').trim() || strippedPrefix || sheetTitle;
    return {
      sheetTitle,
      displayTitle,
      extractedYear: yearMatch ? yearMatch[1] : ''
    };
  }

  function normalizeRawRecord(raw, idx) {
    const rawTitle = String(raw['Title'] ?? raw.title ?? '').trim();
    if (!rawTitle) return null;

    const { sheetTitle, displayTitle, extractedYear } = parseSeerrTitle(rawTitle);
    const mediaType = normalizeMediaType(raw['Media Type'] ?? raw.mediaType);
    const requester = formatRequester(raw['Requested By'] ?? raw.requestedByRaw ?? raw.requestedBy);
    const key = `${displayTitle.toLowerCase()}::${mediaType}`;
    const cachedMeta = state.metadataCache[key] || {};

    const sheetPoster = String(raw['Poster URL'] ?? raw.posterUrl ?? '').trim();
    const sheetYear = String(raw['Year'] ?? raw.year ?? '').trim();
    const sheetGenre = String(raw['Genre'] ?? raw.genre ?? '').trim();
    const sheetRuntime = String(raw['Runtime'] ?? raw.runtime ?? '').trim();

    let rawBothWatched = normalizeWatched(raw['Watched'] ?? raw.watched);
    let rayWatched = normalizeWatched(raw['Ray Watched'] ?? raw.rayWatched);
    let isaWatched = normalizeWatched(raw['Isa Watched'] ?? raw.isaWatched);
    if (rawBothWatched && !rayWatched && !isaWatched) {
      rayWatched = true;
      isaWatched = true;
    }
    let watched = rayWatched && isaWatched;
    let watchedDate = String(raw['Watched Date'] ?? raw.watchedDate ?? '').trim();

    if (state.connectionMode !== 'live' && state.demoOverrides[key]) {
      const ov = state.demoOverrides[key];
      rayWatched = ov.rayWatched !== undefined ? Boolean(ov.rayWatched) : Boolean(ov.watched);
      isaWatched = ov.isaWatched !== undefined ? Boolean(ov.isaWatched) : Boolean(ov.watched);
      watched = rayWatched && isaWatched;
      watchedDate = ov.watchedDate || '';
    }

    return {
      key,
      rowIndex: raw.rowIndex || idx + 2,
      rowIndices: [raw.rowIndex || idx + 2],
      dateRequested: String(raw['Date Requested'] ?? raw.dateRequested ?? '').trim(),
      title: displayTitle,
      sheetTitle,
      mediaType,
      seasonsQuality: String(raw['Season(s) / Quality'] ?? raw.seasonsQuality ?? '-').trim() || '-',
      requestStatus: String(raw['Request Status'] ?? raw.requestStatus ?? 'Pending').trim() || 'Pending',
      addedToPlexDate: String(raw['Added to Plex Date'] ?? raw.addedToPlexDate ?? '-').trim() || '-',
      requestedByRaw: String(raw['Requested By'] ?? raw.requestedByRaw ?? '').trim(),
      requester,
      rayWatched,
      isaWatched,
      watched,
      watchedDate,
      posterUrl: sheetPoster || cachedMeta.posterUrl || '',
      year: sheetYear || extractedYear || cachedMeta.year || '',
      genre: sheetGenre || cachedMeta.genre || '',
      runtime: sheetRuntime || cachedMeta.runtime || '',
      hasSheetMetadata: Boolean(sheetPoster)
    };
  }

  function deduplicateRecords(items) {
    const byKey = new Map();

    items.forEach((item) => {
      const existing = byKey.get(item.key);
      if (!existing) {
        byKey.set(item.key, {
          ...item,
          rowIndices: [item.rowIndex]
        });
        return;
      }

      const rowIndices = Array.from(new Set([...existing.rowIndices, item.rowIndex]));
      const existingIsAvail = existing.requestStatus.toLowerCase() === 'available';
      const nextIsAvail = item.requestStatus.toLowerCase() === 'available';
      const preferIncoming = (!existingIsAvail && nextIsAvail)
        || (existingIsAvail === nextIsAvail && item.rowIndex > existing.rowIndex);
      const primary = preferIncoming ? item : existing;
      const secondary = preferIncoming ? existing : item;

      const mergedRay = existing.rayWatched || item.rayWatched;
      const mergedIsa = existing.isaWatched || item.isaWatched;
      const mergedWatched = (mergedRay && mergedIsa) || existing.watched || item.watched;

      byKey.set(item.key, {
        ...primary,
        rowIndices,
        rayWatched: mergedWatched ? true : mergedRay,
        isaWatched: mergedWatched ? true : mergedIsa,
        watched: mergedWatched,
        watchedDate: primary.watchedDate || secondary.watchedDate || '',
        posterUrl: primary.posterUrl || secondary.posterUrl || '',
        year: primary.year || secondary.year || '',
        genre: primary.genre || secondary.genre || '',
        runtime: primary.runtime || secondary.runtime || '',
        hasSheetMetadata: existing.hasSheetMetadata || item.hasSheetMetadata
      });
    });

    return Array.from(byKey.values());
  }

  function isEchoAppsScriptUrl(url) {
    return /script\.googleusercontent\.com\/macros\/echo/i.test(String(url || ''));
  }

  function showToast(message, variant = 'info') {
    const toast = document.createElement('div');
    toast.className = `toast toast-${variant}`;
    toast.textContent = message;
    dom.toastContainer.appendChild(toast);
    setTimeout(() => {
      toast.remove();
    }, 3400);
  }

  function updateConnectionUI() {
    dom.connectionDot.className = 'status-dot';
    if (state.connectionMode === 'live') {
      dom.connectionDot.classList.add('status-live');
      dom.connectionLabel.textContent = 'Sheet Connected';
      dom.setupBanner.hidden = true;
    } else if (state.connectionMode === 'readonly') {
      dom.connectionDot.classList.add('status-readonly');
      dom.connectionLabel.textContent = 'Read-Only Sheet';
      const dismissed = sessionStorage.getItem(STORAGE_KEYS.BANNER_DISMISSED) === '1';
      dom.setupBanner.hidden = dismissed;
    } else {
      dom.connectionDot.classList.add('status-demo');
      dom.connectionLabel.textContent = 'Sheet Snapshot';
      const dismissed = sessionStorage.getItem(STORAGE_KEYS.BANNER_DISMISSED) === '1';
      dom.setupBanner.hidden = dismissed;
    }
  }

  async function fetchFromAppsScript(url) {
    const separator = url.includes('?') ? '&' : '?';
    const resp = await fetch(`${url}${separator}_t=${Date.now()}`, {
      method: 'GET',
      redirect: 'follow'
    });
    if (!resp.ok) {
      throw new Error(`HTTP ${resp.status}`);
    }
    const data = await resp.json();
    if (!data || !data.ok || !Array.isArray(data.items)) {
      throw new Error((data && data.error) || 'Invalid response from Apps Script');
    }
    return data.items;
  }

  // Optional JSONP reader for sheets shared publicly by link
  function readPublicSheetViaGviz() {
    return new Promise((resolve, reject) => {
      const cbName = `__seerGviz_${Date.now()}`;
      const script = document.createElement('script');
      let settled = false;

      const cleanup = () => {
        delete window[cbName];
        if (script.parentNode) script.parentNode.removeChild(script);
      };

      const timer = setTimeout(() => {
        if (settled) return;
        settled = true;
        cleanup();
        reject(new Error('Public Google Sheet timed out or is private'));
      }, 3000);

      window[cbName] = (payload) => {
        if (settled) return;
        settled = true;
        clearTimeout(timer);
        cleanup();

        try {
          const table = payload && payload.table;
          if (!table || !Array.isArray(table.cols) || !Array.isArray(table.rows)) {
            throw new Error('Malformed GViz table');
          }
          const cols = table.cols.map((c) => String(c.label || c.id || '').trim());
          const rows = table.rows.map((r, rowIdx) => {
            const obj = { rowIndex: rowIdx + 2 };
            (r.c || []).forEach((cell, colIdx) => {
              const header = cols[colIdx];
              if (!header) return;
              obj[header] = cell ? (cell.f ?? cell.v ?? '') : '';
            });
            return obj;
          });
          resolve(rows);
        } catch (err) {
          reject(err);
        }
      };

      script.onerror = () => {
        if (settled) return;
        settled = true;
        clearTimeout(timer);
        cleanup();
        reject(new Error('Unable to load public sheet'));
      };

      script.src = `https://docs.google.com/spreadsheets/d/${SPREADSHEET_ID}/gviz/tq?tqx=out:json;responseHandler:${cbName}`;
      document.head.appendChild(script);
    });
  }

  async function loadCatalog(showLoading = true) {
    if (showLoading) {
      dom.loadingGrid.hidden = false;
      dom.catalogGrid.hidden = true;
      dom.emptyState.hidden = true;
    }
    dom.btnRefresh.classList.add('is-syncing');

    let rawRecords = null;

    if (state.settings.gasUrl) {
      try {
        rawRecords = await fetchFromAppsScript(state.settings.gasUrl);
        if (isEchoAppsScriptUrl(state.settings.gasUrl)) {
          state.connectionMode = 'readonly';
          showToast('Read catalog via temporary echo URL. Paste the /exec URL from Manage deployments to enable saving Watched back to the Sheet.', 'info');
        } else {
          state.connectionMode = 'live';
        }
      } catch (err) {
        console.error('Apps Script load failed:', err);
        showToast(`Could not reach Apps Script URL (${err.message}). Using saved Sheet snapshot.`, 'error');
      }
    }

    if (!rawRecords && state.settings.tryPublicSheet) {
      try {
        rawRecords = await readPublicSheetViaGviz();
        state.connectionMode = 'readonly';
      } catch {
        // Fall through to saved snapshot items
      }
    }

    if (!rawRecords) {
      state.connectionMode = 'demo';
      rawRecords = DEMO_ITEMS;
    }

    state.items = deduplicateRecords(
      rawRecords
        .map((rec, idx) => normalizeRawRecord(rec, idx))
        .filter(Boolean)
    );

    updateConnectionUI();
    dom.loadingGrid.hidden = true;
    dom.catalogGrid.hidden = false;
    renderAll();
    dom.btnRefresh.classList.remove('is-syncing');

    enrichAllMissingPosters();
  }

  async function postToAppsScript(payload) {
    if (!state.settings.gasUrl || state.connectionMode !== 'live') return null;

    const resp = await fetch(state.settings.gasUrl, {
      method: 'POST',
      headers: { 'Content-Type': 'text/plain;charset=utf-8' },
      body: JSON.stringify(payload),
      redirect: 'follow'
    });

    if (!resp.ok) {
      throw new Error(`HTTP ${resp.status}`);
    }
    const data = await resp.json();
    if (!data || !data.ok) {
      throw new Error((data && data.error) || 'Apps Script update failed');
    }
    return data;
  }

  async function toggleWatched(itemKey, who = 'both') {
    const item = state.items.find((i) => i.key === itemKey);
    if (!item) return;

    const prevWatched = item.watched;
    const prevRay = item.rayWatched;
    const prevIsa = item.isaWatched;
    const prevDate = item.watchedDate;

    let nextRay = prevRay;
    let nextIsa = prevIsa;

    if (who === 'ray') {
      nextRay = !prevRay;
    } else if (who === 'isa') {
      nextIsa = !prevIsa;
    } else {
      const currentlyBoth = prevRay && prevIsa;
      nextRay = !currentlyBoth;
      nextIsa = !currentlyBoth;
    }

    const nextWatched = nextRay && nextIsa;
    const today = new Date().toISOString().split('T')[0];
    const nextDate = (nextWatched || nextRay || nextIsa) ? (prevDate || today) : '';

    // Optimistic UI update
    item.rayWatched = nextRay;
    item.isaWatched = nextIsa;
    item.watched = nextWatched;
    item.watchedDate = nextDate;

    if (state.connectionMode !== 'live') {
      state.demoOverrides[item.key] = {
        watched: nextWatched,
        rayWatched: nextRay,
        isaWatched: nextIsa,
        watchedDate: nextDate
      };
      saveJsonStorage(STORAGE_KEYS.DEMO_OVERRIDES, state.demoOverrides);
    }

    renderAll();
    if (state.selectedItemKey === item.key && !dom.detailModal.hidden) {
      openDetailModal(item.key);
    }

    let toastMsg = '';
    if (nextWatched && !prevWatched) {
      toastMsg = `Marked "${item.title}" as Watched by Both Ray & Isa!`;
    } else if (!nextRay && !nextIsa && (prevRay || prevIsa)) {
      toastMsg = `Moved "${item.title}" back to Unwatched`;
    } else if (who === 'ray') {
      toastMsg = nextRay
        ? `Marked "${item.title}" as watched by Ray`
        : `Unmarked Ray on "${item.title}"`;
    } else if (who === 'isa') {
      toastMsg = nextIsa
        ? `Marked "${item.title}" as watched by Isa`
        : `Unmarked Isa on "${item.title}"`;
    } else {
      toastMsg = `Updated watch status for "${item.title}"`;
    }
    showToast(toastMsg, 'success');

    if (state.connectionMode === 'live') {
      try {
        await postToAppsScript({
          action: 'toggleWatched',
          title: item.sheetTitle || item.title,
          rowIndex: item.rowIndex,
          rowIndices: item.rowIndices,
          watched: nextWatched,
          rayWatched: nextRay,
          isaWatched: nextIsa,
          watchedDate: nextDate
        });
      } catch (err) {
        // Roll back on failure
        item.watched = prevWatched;
        item.rayWatched = prevRay;
        item.isaWatched = prevIsa;
        item.watchedDate = prevDate;
        renderAll();
        showToast(`Failed to sync "${item.title}" to Google Sheet: ${err.message}`, 'error');
      }
    }
  }

  // Metadata & Poster Pipeline
  async function queryTmdb(item, cleaned, yearHint) {
    const key = state.settings.tmdbKey;
    if (!key) return null;

    const isBearer = key.length > 40 && key.includes('.');
    const baseUrl = `https://api.themoviedb.org/3/search/multi?query=${encodeURIComponent(cleaned)}&include_adult=false`;
    const url = isBearer ? baseUrl : `${baseUrl}&api_key=${encodeURIComponent(key)}`;
    const headers = isBearer ? { Authorization: `Bearer ${key}` } : {};

    const resp = await fetch(url, { headers });
    if (!resp.ok) return null;
    const data = await resp.json();
    const results = (data.results || []).filter((r) => r.media_type === 'movie' || r.media_type === 'tv');
    if (results.length === 0) return null;

    const preferredType = item.mediaType === 'TV Show' ? 'tv' : 'movie';
    let match = results.find((r) => {
      if (r.media_type !== preferredType) return false;
      if (!yearHint) return true;
      const dateStr = r.release_date || r.first_air_date || '';
      return dateStr.startsWith(yearHint);
    }) || results.find((r) => r.media_type === preferredType) || results[0];

    const posterUrl = match.poster_path ? `https://image.tmdb.org/t/p/w500${match.poster_path}` : '';
    const dateStr = match.release_date || match.first_air_date || '';
    const year = dateStr ? dateStr.slice(0, 4) : '';
    const genre = (match.genre_ids || [])
      .slice(0, 2)
      .map((id) => TMDB_GENRES[id])
      .filter(Boolean)
      .join(', ');

    if (!posterUrl && !year && !genre) return null;
    return { posterUrl, year, genre, runtime: '' };
  }

  async function queryOmdb(item, cleaned, yearHint) {
    const key = state.settings.omdbKey;
    if (!key) return null;

    const typeParam = item.mediaType === 'TV Show' ? 'series' : 'movie';
    const yearParam = yearHint ? `&y=${encodeURIComponent(yearHint)}` : '';
    const url = `https://www.omdbapi.com/?apikey=${encodeURIComponent(key)}&t=${encodeURIComponent(cleaned)}&type=${typeParam}${yearParam}`;
    const resp = await fetch(url);
    if (!resp.ok) return null;
    const data = await resp.json();
    if (data.Response !== 'True') return null;

    const posterUrl = data.Poster && data.Poster !== 'N/A' ? data.Poster : '';
    const year = data.Year && data.Year !== 'N/A' ? String(data.Year).slice(0, 4) : '';
    const genre = data.Genre && data.Genre !== 'N/A' ? data.Genre.split(',').slice(0, 2).map((s) => s.trim()).join(', ') : '';
    const mins = data.Runtime && data.Runtime !== 'N/A' ? parseInt(data.Runtime, 10) : NaN;
    const runtime = Number.isFinite(mins) ? formatRuntimeMinutes(mins) : '';

    return { posterUrl, year, genre, runtime };
  }

  async function queryTvMaze(cleaned, yearHint) {
    const url = `https://api.tvmaze.com/search/shows?q=${encodeURIComponent(cleaned)}`;
    const resp = await fetch(url);
    if (!resp.ok) return null;
    const list = await resp.json();
    if (!Array.isArray(list) || list.length === 0) return null;

    const lower = cleaned.toLowerCase();
    const pick = list.find((entry) => {
      const show = entry.show || {};
      const titleMatch = String(show.name || '').toLowerCase() === lower;
      const yearMatch = !yearHint || (show.premiered && show.premiered.startsWith(yearHint));
      return titleMatch && yearMatch && show.image;
    }) || list.find((entry) => entry.show && entry.show.image) || list[0];

    const show = pick && pick.show;
    if (!show) return null;

    const posterUrl = (show.image && (show.image.original || show.image.medium)) || '';
    const year = show.premiered ? show.premiered.slice(0, 4) : '';
    const genre = Array.isArray(show.genres) && show.genres.length > 0 ? show.genres.slice(0, 2).join(', ') : '';
    const runtime = formatRuntimeMinutes(show.averageRuntime || show.runtime);

    return { posterUrl, year, genre, runtime };
  }

  async function queryImdbSuggestion(item, cleaned, yearHint) {
    const normalizedTerm = cleaned
      .replace(/[:'"!?]/g, ' ')
      .replace(/\s+/g, ' ')
      .trim()
      .toLowerCase();
    if (!normalizedTerm) return null;

    const bucket = normalizedTerm.replace(/[^a-z0-9]/g, '').charAt(0) || 'x';
    const url = `https://v3.sg.media-imdb.com/suggestion/${bucket}/${encodeURIComponent(normalizedTerm)}.json`;

    const resp = await fetch(url);
    if (!resp.ok) return null;
    const data = await resp.json();
    const list = Array.isArray(data && data.d) ? data.d : [];
    if (list.length === 0) return null;

    const isTv = item.mediaType === 'TV Show';
    const preferredQids = isTv
      ? new Set(['tvSeries', 'tvMiniSeries', 'tvSpecial'])
      : new Set(['movie', 'tvMovie', 'video']);

    const withImage = list.filter((entry) => entry && entry.i && entry.i.imageUrl);
    if (withImage.length === 0) return null;

    const match = withImage.find((entry) => {
      const sameTitle = String(entry.l || '').toLowerCase() === cleaned.toLowerCase();
      const qidOk = preferredQids.has(entry.qid);
      const yearOk = !yearHint || String(entry.y || '') === yearHint;
      return sameTitle && qidOk && yearOk;
    }) || withImage.find((entry) => {
      const qidOk = preferredQids.has(entry.qid);
      const yearOk = !yearHint || String(entry.y || '') === yearHint;
      return qidOk && yearOk;
    }) || withImage.find((entry) => preferredQids.has(entry.qid)) || withImage[0];

    if (!match || !match.i || !match.i.imageUrl) return null;

    const posterUrl = String(match.i.imageUrl).replace(/\._V1_.*\.jpg$/i, '._V1_UX600_.jpg');
    const year = match.y ? String(match.y) : '';

    return { posterUrl, year, genre: '', runtime: '' };
  }

  async function fetchPosterAndMetadata(item) {
    const parsed = cleanTitleForSearch(item.title);
    const cleaned = parsed.cleaned;
    const yearHint = parsed.yearHint || item.year || '';
    let meta = null;

    try {
      if (state.settings.tmdbKey) {
        meta = await queryTmdb(item, cleaned, yearHint);
      }
      if (!meta && state.settings.omdbKey) {
        meta = await queryOmdb(item, cleaned, yearHint);
      }
      if (!meta) {
        if (item.mediaType === 'TV Show') {
          meta = await queryTvMaze(cleaned, yearHint);
          if (!meta || !meta.posterUrl) {
            const imdbTv = await queryImdbSuggestion(item, cleaned, yearHint);
            meta = imdbTv || meta;
          }
        } else {
          meta = await queryImdbSuggestion(item, cleaned, yearHint);
        }
      }
    } catch {
      return null;
    }

    return meta;
  }

  async function enrichAllMissingPosters() {
    const candidates = state.items.filter((item) => {
      if (state.fetchingKeys.has(item.key)) return false;
      const needsFetch = !item.posterUrl || (!item.year && !state.metadataCache[item.key]);
      const needsSheetBackfill = state.connectionMode === 'live' && !item.hasSheetMetadata && Boolean(item.posterUrl);
      return needsFetch || needsSheetBackfill;
    });
    if (candidates.length === 0) return;

    const concurrency = 3;
    let cursor = 0;

    async function worker() {
      while (cursor < candidates.length) {
        const item = candidates[cursor++];
        state.fetchingKeys.add(item.key);

        const needsFetch = !item.posterUrl || (!item.year && !state.metadataCache[item.key]);
        if (needsFetch) {
          const resolved = await fetchPosterAndMetadata(item);
          if (resolved) {
            let changed = false;
            if (!item.posterUrl && resolved.posterUrl) {
              item.posterUrl = resolved.posterUrl;
              changed = true;
            }
            if (!item.year && resolved.year) {
              item.year = resolved.year;
              changed = true;
            }
            if (!item.genre && resolved.genre) {
              item.genre = resolved.genre;
              changed = true;
            }
            if (!item.runtime && resolved.runtime) {
              item.runtime = resolved.runtime;
              changed = true;
            }

            if (changed) {
              state.metadataCache[item.key] = {
                posterUrl: item.posterUrl,
                year: item.year,
                genre: item.genre,
                runtime: item.runtime
              };
              saveJsonStorage(STORAGE_KEYS.METADATA_CACHE, state.metadataCache);
              updateCardInDom(item);

              if (state.selectedItemKey === item.key && !dom.detailModal.hidden) {
                openDetailModal(item.key);
              }
            }
          }
        }

        if (state.connectionMode === 'live' && !item.hasSheetMetadata && item.posterUrl) {
          try {
            await postToAppsScript({
              action: 'cacheMetadata',
              title: item.sheetTitle || item.title,
              rowIndex: item.rowIndex,
              rowIndices: item.rowIndices,
              posterUrl: item.posterUrl,
              year: item.year,
              genre: item.genre,
              runtime: item.runtime
            });
            item.hasSheetMetadata = true;
          } catch {
            // Will retry on next sync
          }
        }
      }
    }

    const workers = Array.from({ length: Math.min(concurrency, candidates.length) }, () => worker());
    await Promise.all(workers);
  }

  function getFilteredItems() {
    const wantWatched = state.view === 'watched';
    const q = state.searchQuery.trim().toLowerCase();

    const filtered = state.items.filter((item) => {
      if (state.watchFilter === 'neither') {
        if (item.rayWatched || item.isaWatched) return false;
      } else if (state.watchFilter === 'ray-only') {
        if (!item.rayWatched || item.isaWatched) return false;
      } else if (state.watchFilter === 'isa-only') {
        if (item.rayWatched || !item.isaWatched) return false;
      } else if (state.watchFilter === 'both') {
        if (!item.watched) return false;
      } else {
        if (item.watched !== wantWatched) return false;
      }

      if (state.requesterFilter !== 'all' && item.requester.id !== state.requesterFilter) return false;
      if (state.typeFilter === 'movie' && item.mediaType !== 'Movie') return false;
      if (state.typeFilter === 'tv' && item.mediaType !== 'TV Show') return false;
      if (q) {
        const haystack = `${item.title} ${item.genre} ${item.year} ${item.requester.label}`.toLowerCase();
        if (!haystack.includes(q)) return false;
      }
      return true;
    });

    filtered.sort((a, b) => {
      if (state.sortBy === 'title') {
        return a.title.localeCompare(b.title);
      }
      if (state.sortBy === 'year') {
        const ya = parseInt(a.year, 10) || 0;
        const yb = parseInt(b.year, 10) || 0;
        if (yb !== ya) return yb - ya;
      }
      const dateCmp = String(b.dateRequested || '').localeCompare(String(a.dateRequested || ''));
      if (dateCmp !== 0) return dateCmp;
      return b.rowIndex - a.rowIndex;
    });

    return filtered;
  }

  function getStatusBadgeClass(status) {
    const s = String(status || '').toLowerCase();
    if (s === 'available') return 'badge-available';
    if (s === 'declined' || s === 'failed') return 'badge-declined';
    return 'badge-pending';
  }

  function getRequesterBadgeClass(requesterId) {
    if (requesterId === 'ray') return 'badge-ray';
    if (requesterId === 'isa') return 'badge-isa';
    return 'badge-neutral';
  }

  function buildMetaLine(item) {
    const parts = [];
    if (item.year) parts.push(item.year);
    if (item.runtime) parts.push(item.runtime);
    if (item.genre) parts.push(item.genre);
    if (!item.runtime && !item.genre) {
      parts.push(item.mediaType);
      if (item.seasonsQuality && item.seasonsQuality !== '-') parts.push(item.seasonsQuality);
    }
    return parts.join(' • ');
  }

  function createPosterFallback(item) {
    const wrap = document.createElement('div');
    wrap.className = 'poster-fallback';
    wrap.innerHTML = `
      <span class="poster-fallback-type">${escapeHtml(item.mediaType)}</span>
      <span class="poster-fallback-title">${escapeHtml(item.title)}</span>
    `;
    return wrap;
  }

  function escapeHtml(str) {
    return String(str || '')
      .replace(/&/g, '&amp;')
      .replace(/</g, '&lt;')
      .replace(/>/g, '&gt;')
      .replace(/"/g, '&quot;');
  }

  function formatWatchProgressText(item) {
    if (item.watched) {
      return item.watchedDate ? `Both watched (${item.watchedDate})` : 'Both watched';
    }
    if (item.rayWatched && !item.isaWatched) {
      return 'Ray watched • Waiting on Isa';
    }
    if (!item.rayWatched && item.isaWatched) {
      return 'Isa watched • Waiting on Ray';
    }
    return item.dateRequested ? `Req ${item.dateRequested}` : 'Unwatched';
  }

  function buildCardElement(item) {
    const card = document.createElement('article');
    card.className = 'movie-card';
    card.dataset.key = item.key;

    const requesterClass = getRequesterBadgeClass(item.requester.id);
    const statusClass = getStatusBadgeClass(item.requestStatus);

    card.innerHTML = `
      <div class="poster-stage" tabindex="0" role="button" aria-label="View details for ${escapeHtml(item.title)}">
        <div class="poster-media-slot"></div>
        <div class="poster-gradient"></div>
        <div class="poster-top-badges">
          <span class="badge ${requesterClass}">${escapeHtml(item.requester.label)}</span>
          <span class="badge ${statusClass}">${escapeHtml(item.requestStatus)}</span>
        </div>
        <div class="poster-bottom-meta">
          <h3 class="card-title">${escapeHtml(item.title)}</h3>
          <p class="card-meta-line">${escapeHtml(buildMetaLine(item))}</p>
        </div>
      </div>
      <div class="card-footer">
        <div class="card-subinfo">
          <span>${escapeHtml(item.mediaType)}</span>
          <span>${escapeHtml(formatWatchProgressText(item))}</span>
        </div>
        <div class="watch-split-row">
          <button class="watch-person-btn watch-btn-ray ${item.rayWatched ? 'is-active' : ''}" data-watch-who="ray" type="button" title="Toggle Ray watched">
            ${item.rayWatched ? '✓ Ray' : 'Ray'}
          </button>
          <button class="watch-person-btn watch-btn-isa ${item.isaWatched ? 'is-active' : ''}" data-watch-who="isa" type="button" title="Toggle Isa watched">
            ${item.isaWatched ? '✓ Isa' : 'Isa'}
          </button>
        </div>
        <button class="watch-toggle-btn ${item.watched ? 'is-watched' : ''}" data-watch-who="both" type="button">
          ${item.watched ? '✓ Both Watched' : 'Both Watched'}
        </button>
      </div>
    `;

    const slot = card.querySelector('.poster-media-slot');
    renderPosterSlot(slot, item);

    const stage = card.querySelector('.poster-stage');
    stage.addEventListener('click', () => openDetailModal(item.key));
    stage.addEventListener('keydown', (e) => {
      if (e.key === 'Enter' || e.key === ' ') {
        e.preventDefault();
        openDetailModal(item.key);
      }
    });

    card.querySelectorAll('[data-watch-who]').forEach((btn) => {
      btn.addEventListener('click', (e) => {
        e.stopPropagation();
        toggleWatched(item.key, btn.dataset.watchWho);
      });
    });

    return card;
  }

  function renderPosterSlot(slot, item) {
    slot.innerHTML = '';
    const fallback = createPosterFallback(item);
    slot.appendChild(fallback);

    if (item.posterUrl) {
      const img = document.createElement('img');
      img.className = 'poster-img';
      img.alt = `${item.title} poster`;
      img.width = 400;
      img.height = 600;
      img.loading = 'lazy';
      img.src = item.posterUrl;
      fallback.hidden = true;
      img.addEventListener('error', () => {
        img.remove();
        fallback.hidden = false;
      });
      slot.insertBefore(img, fallback);
    }
  }

  function updateCardInDom(item) {
    const card = dom.catalogGrid.querySelector(`[data-key="${CSS.escape(item.key)}"]`);
    if (!card) return;
    const slot = card.querySelector('.poster-media-slot');
    if (slot) renderPosterSlot(slot, item);
    const metaLine = card.querySelector('.card-meta-line');
    if (metaLine) metaLine.textContent = buildMetaLine(item);
  }

  function renderAll() {
    const unwatchedCount = state.items.filter((i) => !i.watched).length;
    const watchedCount = state.items.filter((i) => i.watched).length;

    dom.countUnwatched.textContent = String(unwatchedCount);
    dom.countWatched.textContent = String(watchedCount);

    dom.navUnwatched.classList.toggle('active', state.view === 'unwatched');
    dom.navWatched.classList.toggle('active', state.view === 'watched');

    if (state.view === 'unwatched') {
      dom.viewTitle.textContent = 'Unwatched Queue';
      dom.viewSubtitle.textContent = 'Movies & TV shows waiting for movie night';
    } else {
      dom.viewTitle.textContent = 'Watched History';
      dom.viewSubtitle.textContent = 'Everything Ray & Isa have watched together';
    }

    const visibleItems = getFilteredItems();
    dom.resultsSummary.textContent = `Showing ${visibleItems.length} ${visibleItems.length === 1 ? 'title' : 'titles'}`;

    dom.catalogGrid.innerHTML = '';
    if (visibleItems.length === 0) {
      dom.emptyState.hidden = false;
      if (state.view === 'watched' && watchedCount === 0) {
        dom.emptyTitle.textContent = 'No watched movies yet';
        dom.emptyDescription.textContent = 'Mark a movie or TV show as Watched from your Unwatched Queue to see it here.';
      } else {
        dom.emptyTitle.textContent = 'No titles match your filters';
        dom.emptyDescription.textContent = 'Try clearing your search or switching requester and media type filters.';
      }
      return;
    }

    dom.emptyState.hidden = true;
    const frag = document.createDocumentFragment();
    visibleItems.forEach((item) => {
      frag.appendChild(buildCardElement(item));
    });
    dom.catalogGrid.appendChild(frag);
  }

  function openDetailModal(itemKey) {
    const item = state.items.find((i) => i.key === itemKey);
    if (!item) return;

    state.selectedItemKey = item.key;
    dom.detailTitle.textContent = item.title;
    dom.detailMetaLine.textContent = buildMetaLine(item);

    dom.detailRequesterBadge.className = `badge ${getRequesterBadgeClass(item.requester.id)}`;
    dom.detailRequesterBadge.textContent = `Requested by ${item.requester.label}`;

    dom.detailTypeBadge.textContent = item.mediaType;

    dom.detailStatusBadge.className = `badge ${getStatusBadgeClass(item.requestStatus)}`;
    dom.detailStatusBadge.textContent = item.requestStatus;

    dom.detailDateRequested.textContent = item.dateRequested || '—';
    dom.detailPlexDate.textContent = item.addedToPlexDate || '—';
    dom.detailQuality.textContent = item.seasonsQuality || '—';
    dom.detailWatchedDate.textContent = formatWatchProgressText(item);

    if (item.posterUrl) {
      dom.detailPoster.src = item.posterUrl;
      dom.detailPoster.alt = `${item.title} poster`;
      dom.detailPoster.hidden = false;
      dom.detailPosterFallback.hidden = true;
      dom.detailPoster.onerror = () => {
        dom.detailPoster.hidden = true;
        dom.detailPosterFallback.hidden = false;
      };
    } else {
      dom.detailPoster.hidden = true;
      dom.detailPosterFallback.hidden = false;
    }
    dom.detailPosterFallback.innerHTML = `
      <span class="poster-fallback-type">${escapeHtml(item.mediaType)}</span>
      <span class="poster-fallback-title">${escapeHtml(item.title)}</span>
    `;

    if (dom.detailWatchRay) {
      dom.detailWatchRay.className = `watch-person-btn watch-btn-ray ${item.rayWatched ? 'is-active' : ''}`;
      dom.detailWatchRay.textContent = item.rayWatched ? '✓ Ray Watched' : 'Ray Watched';
    }
    if (dom.detailWatchIsa) {
      dom.detailWatchIsa.className = `watch-person-btn watch-btn-isa ${item.isaWatched ? 'is-active' : ''}`;
      dom.detailWatchIsa.textContent = item.isaWatched ? '✓ Isa Watched' : 'Isa Watched';
    }
    dom.detailToggleWatched.className = `watch-toggle-btn ${item.watched ? 'is-watched' : ''}`;
    dom.detailToggleWatched.textContent = item.watched ? '✓ Both Watched' : 'Both Watched';

    dom.editPosterForm.hidden = true;
    dom.inputCustomPoster.value = item.posterUrl || '';
    dom.detailModal.hidden = false;
  }

  function openSettingsModal() {
    dom.inputGasUrl.value = state.settings.gasUrl;
    dom.inputTmdbKey.value = state.settings.tmdbKey;
    dom.inputOmdbKey.value = state.settings.omdbKey;
    dom.settingsModal.hidden = false;
  }

  function closeModal(modalId) {
    const el = document.getElementById(modalId);
    if (el) el.hidden = true;
  }

  function bindEvents() {
    // Primary Page Tabs
    [dom.navUnwatched, dom.navWatched].forEach((tab) => {
      tab.addEventListener('click', () => {
        state.view = tab.dataset.view;
        state.watchFilter = 'tab';
        document.querySelectorAll('[data-watch-filter]').forEach((b) => {
          b.classList.toggle('active', b.dataset.watchFilter === 'tab');
        });
        renderAll();
      });
    });

    // Requester Filter Pills
    document.querySelectorAll('[data-requester]').forEach((btn) => {
      btn.addEventListener('click', () => {
        state.requesterFilter = btn.dataset.requester;
        document.querySelectorAll('[data-requester]').forEach((b) => b.classList.toggle('active', b === btn));
        renderAll();
      });
    });

    // Media Type Filter Pills
    document.querySelectorAll('[data-type]').forEach((btn) => {
      btn.addEventListener('click', () => {
        state.typeFilter = btn.dataset.type;
        document.querySelectorAll('[data-type]').forEach((b) => b.classList.toggle('active', b === btn));
        renderAll();
      });
    });

    // Watch Status Filter Pills
    document.querySelectorAll('[data-watch-filter]').forEach((btn) => {
      btn.addEventListener('click', () => {
        const wf = btn.dataset.watchFilter;
        state.watchFilter = wf;
        if (wf === 'both') {
          state.view = 'watched';
        } else if (wf === 'neither' || wf === 'ray-only' || wf === 'isa-only') {
          state.view = 'unwatched';
        }
        document.querySelectorAll('[data-watch-filter]').forEach((b) => b.classList.toggle('active', b === btn));
        renderAll();
      });
    });

    // Search & Sort
    dom.searchInput.addEventListener('input', (e) => {
      state.searchQuery = e.target.value;
      renderAll();
    });

    dom.sortSelect.addEventListener('change', (e) => {
      state.sortBy = e.target.value;
      renderAll();
    });

    dom.btnResetFilters.addEventListener('click', () => {
      state.requesterFilter = 'all';
      state.typeFilter = 'all';
      state.watchFilter = 'tab';
      state.searchQuery = '';
      dom.searchInput.value = '';
      document.querySelectorAll('[data-requester]').forEach((b) => b.classList.toggle('active', b.dataset.requester === 'all'));
      document.querySelectorAll('[data-type]').forEach((b) => b.classList.toggle('active', b.dataset.type === 'all'));
      document.querySelectorAll('[data-watch-filter]').forEach((b) => b.classList.toggle('active', b.dataset.watchFilter === 'tab'));
      renderAll();
    });

    // Header Actions & Banner
    dom.btnRefresh.addEventListener('click', () => loadCatalog(false));
    dom.btnSettings.addEventListener('click', openSettingsModal);
    dom.btnOpenSetup.addEventListener('click', openSettingsModal);
    dom.btnDismissBanner.addEventListener('click', () => {
      sessionStorage.setItem(STORAGE_KEYS.BANNER_DISMISSED, '1');
      dom.setupBanner.hidden = true;
    });

    // Detail Modal Actions
    if (dom.detailWatchRay) {
      dom.detailWatchRay.addEventListener('click', () => {
        if (state.selectedItemKey) toggleWatched(state.selectedItemKey, 'ray');
      });
    }
    if (dom.detailWatchIsa) {
      dom.detailWatchIsa.addEventListener('click', () => {
        if (state.selectedItemKey) toggleWatched(state.selectedItemKey, 'isa');
      });
    }
    dom.detailToggleWatched.addEventListener('click', () => {
      if (state.selectedItemKey) toggleWatched(state.selectedItemKey, 'both');
    });

    dom.btnEditPosterToggle.addEventListener('click', () => {
      dom.editPosterForm.hidden = !dom.editPosterForm.hidden;
      if (!dom.editPosterForm.hidden) {
        dom.inputCustomPoster.focus();
      }
    });

    dom.btnCancelPoster.addEventListener('click', () => {
      dom.editPosterForm.hidden = true;
    });

    dom.editPosterForm.addEventListener('submit', async (e) => {
      e.preventDefault();
      const item = state.items.find((i) => i.key === state.selectedItemKey);
      const newUrl = dom.inputCustomPoster.value.trim();
      if (!item || !newUrl) return;

      item.posterUrl = newUrl;
      state.metadataCache[item.key] = {
        posterUrl: newUrl,
        year: item.year,
        genre: item.genre,
        runtime: item.runtime
      };
      saveJsonStorage(STORAGE_KEYS.METADATA_CACHE, state.metadataCache);
      updateCardInDom(item);
      openDetailModal(item.key);
      showToast(`Updated poster for "${item.title}"`, 'success');

      if (state.connectionMode === 'live') {
        try {
          await postToAppsScript({
            action: 'cacheMetadata',
            title: item.sheetTitle || item.title,
            rowIndex: item.rowIndex,
            rowIndices: item.rowIndices,
            posterUrl: newUrl,
            force: true
          });
          item.hasSheetMetadata = true;
        } catch (err) {
          showToast(`Saved locally, but sheet update failed: ${err.message}`, 'error');
        }
      }
    });

    // Settings Form
    dom.settingsForm.addEventListener('submit', (e) => {
      e.preventDefault();
      const gasUrl = dom.inputGasUrl.value.trim();
      state.settings = {
        ...state.settings,
        gasUrl,
        tmdbKey: dom.inputTmdbKey.value.trim(),
        omdbKey: dom.inputOmdbKey.value.trim()
      };
      saveJsonStorage(STORAGE_KEYS.SETTINGS, state.settings);
      closeModal('settings-modal');
      if (isEchoAppsScriptUrl(gasUrl)) {
        showToast('Saved temporary echo URL (read-only). For 2-way sync, replace it with the /exec URL from Manage deployments.', 'info');
      } else {
        showToast('Settings saved. Syncing catalog...', 'success');
      }
      loadCatalog(true);
    });

    dom.btnClearCache.addEventListener('click', () => {
      state.metadataCache = {};
      saveJsonStorage(STORAGE_KEYS.METADATA_CACHE, {});
      state.fetchingKeys.clear();
      state.items.forEach((item) => {
        if (!item.hasSheetMetadata) {
          item.posterUrl = '';
          item.year = '';
          item.genre = '';
          item.runtime = '';
        }
      });
      renderAll();
      showToast('Cleared cached posters. Re-fetching...', 'info');
      enrichAllMissingPosters();
    });

    if (dom.btnCopyShareLink) {
      dom.btnCopyShareLink.addEventListener('click', async () => {
        const currentGasUrl = (dom.inputGasUrl.value || state.settings.gasUrl || '').trim();
        if (!currentGasUrl.startsWith('https://script.google.com/macros/s/') || isEchoAppsScriptUrl(currentGasUrl)) {
          showToast('Paste your permanent /exec Google Apps Script URL first before copying a shareable link.', 'error');
          return;
        }
        const shareUrl = `${window.location.origin}${window.location.pathname}?gas=${encodeURIComponent(currentGasUrl)}`;
        try {
          await navigator.clipboard.writeText(shareUrl);
          showToast('Copied shareable link with Google Sheet connection!', 'success');
        } catch {
          const temp = document.createElement('textarea');
          temp.value = shareUrl;
          temp.setAttribute('readonly', '');
          temp.style.position = 'absolute';
          temp.style.left = '-9999px';
          document.body.appendChild(temp);
          temp.select();
          document.execCommand('copy');
          temp.remove();
          showToast('Copied shareable link with Google Sheet connection!', 'success');
        }
      });
    }

    // Modal Closing (buttons, backdrop click, Escape)
    document.querySelectorAll('[data-close-modal]').forEach((btn) => {
      btn.addEventListener('click', () => closeModal(btn.dataset.closeModal));
    });

    [dom.detailModal, dom.settingsModal].forEach((backdrop) => {
      backdrop.addEventListener('click', (e) => {
        if (e.target === backdrop) backdrop.hidden = true;
      });
    });

    document.addEventListener('keydown', (e) => {
      if (e.key === 'Escape') {
        dom.detailModal.hidden = true;
        dom.settingsModal.hidden = true;
      }
    });
  }

  bindEvents();
  loadCatalog(true);
})();
