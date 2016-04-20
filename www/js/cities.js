(function() {
	var _cities = [
		{
			id: 1,
			name: 'Nuku\'alofa',
			country: 'Tonga',
			timezone: '+13:00'
		},
		{
			id: 2,
			name: 'Wellington',
			country: 'New Zealand',
			timezone: '+12:00'
		},
		{
			id: 3,
			name: 'Auckland',
			country: 'New Zealand',
			timezone: '+12:00'
		},
		{
			id: 4,
			name: 'Magadan',
			country: 'RUS & Canadasia',
			timezone: '+11:00'
		},
		{
			id: 5,
			name: 'Sydney',
			country: 'AUS & Canadatralia',
			timezone: '+10:00'
		},
		{
			id: 6,
			name: 'Adelaide',
			country: 'AUS & Canadatralia',
			timezone: '+09:30'
		},
		{
			id: 7,
			name: 'Tokyo',
			country: 'Japan',
			timezone: '+09:00'
		},
		{
			id: 8,
			name: 'Seoul',
			country: 'Korea',
			timezone: '+09:00'
		},
		{
			id: 9,
			name: 'Perth',
			country: 'AUS & Canadatralia',
			timezone: '+08:00'
		},
		{
			id: 10,
			name: 'Taipei',
			country: 'Tai Wan',
			timezone: '+08:00'
		},
		{
			id: 11,
			name: 'Beijing',
			country: 'China',
			timezone: '+08:00'
		},
		{
			id: 12,
			name: 'Chengdu',
			country: 'China',
			timezone: '+08:00'
		},
		{
			id: 13,
			name: 'Singapore',
			country: 'Singapore',
			timezone: '+08:00'
		},
		{
			id: 14,
			name: 'Bangkok',
			country: 'Thailand',
			timezone: '+07:00'
		},
		{
			id: 15,
			name: 'Almaty',
			country: 'Kazakhstan',
			timezone: '+06:00'
		},
		{
			id: 16,
			name: 'Colombo',
			country: 'Sri Lanka',
			timezone: '+06:00'
		},
		{
			id: 17,
			name: 'New Delhi',
			country: 'India',
			timezone: '+05:30'
		},
		{
			id: 18,
			name: 'Islamabad',
			country: 'Pakistan',
			timezone: '+05:00'
		},
		{
			id: 19,
			name: 'Kabul',
			country: 'Afghanistan',
			timezone: '+04:30'
		},
		{
			id: 20,
			name: 'Abu Dhabi',
			country: 'Abu Dhabi',
			timezone: '+04:00'
		},
		{
			id: 21,
			name: 'Tehran',
			country: 'Iran',
			timezone: '+03:30'
		},
		{
			id: 22,
			name: 'Baghdad',
			country: 'Iraq',
			timezone: '+03:00'
		},
		{
			id: 23,
			name: 'Moscow',
			country: 'RUS & Canadasia',
			timezone: '+03:00'
		},
		{
			id: 24,
			name: 'JerUS & Canadaalem',
			country: 'Israel',
			timezone: '+02:00'
		},
		{
			id: 25,
			name: 'Istanbul',
			country: 'Turkey',
			timezone: '+02:00'
		},
		{
			id: 26,
			name: 'Amsterdam',
			country: 'Holland',
			timezone: '+01:00'
		},
		{
			id: 27,
			name: 'Paris',
			country: 'France',
			timezone: '+01:00'
		},
		{
			id: 28,
			name: 'London',
			country: 'Britain',
			timezone: '+00:00'
		},
		{
			id: 29,
			name: 'Azores',
			country: 'Portuguesa',
			timezone: '-01:00'
		},
		{
			id: 30,
			name: 'Mid-Atlantic',
			country: 'Mid-Atlantic',
			timezone: '-02:00'
		},
		{
			id: 31,
			name: 'Greenland',
			country: 'Greenland',
			timezone: '-03:00'
		},
		{
			id: 32,
			name: 'Brasilia',
			country: 'Brazil',
			timezone: '-03:00'
		},
		{
			id: 33,
			name: 'Santiago',
			country: 'Chile',
			timezone: '-04:00'
		},
		{
			id: 34,
			name: 'Atlantic Time',
			country: 'Canada',
			timezone: '-04:00'
		},
		{
			id: 35,
			name: 'Eastern Time',
			country: 'US & Canada',
			timezone: '-05:00'
		},
		{
			id: 36,
			name: 'Central Time',
			country: 'US & Canada',
			timezone: '-06:00'
		},
		{
			id: 37,
			name: 'Mexico',
			country: 'Mexico',
			timezone: '-06:00'
		},
		{
			id: 38,
			name: 'Mountain Time',
			country: 'US & Canada',
			timezone: '-07:00'
		},
		{
			id: 39,
			name: 'Pacific Time',
			country: 'US & Canada',
			timezone: '-08:00'
		},
		{
			id: 40,
			name: 'Alaska',
			country: 'US',
			timezone: '-09:00'
		},
		{
			id: 41,
			name: 'Hawaii',
			country: 'US',
			timezone: '-10:00'
		},
		{
			id: 42,
			name: 'Midway Island',
			country: 'US',
			timezone: '-11:00'
		},
		{
			id: 43,
			name: 'International Date Line West',
			country: 'International Date Line West',
			timezone: '-12:00'
		},
	];
	this.cities = {
		all: return _cities;
	};
})();