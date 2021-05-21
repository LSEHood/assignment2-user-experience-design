import { AfterViewInit, Component, ContentChildren, ElementRef, OnInit, QueryList, ViewChildren } from "@angular/core";
import 'ol/ol.css';
import {Map, View} from 'ol';
import TileLayer from 'ol/layer/Tile';
import OSM from 'ol/source/OSM';
import {fromLonLat} from 'ol/proj';

@Component({
	selector: "app-home",
	templateUrl: "./home.component.html",
	styleUrls: ["./home.component.css"],
})
export class HomeComponent implements OnInit, AfterViewInit {

	@ViewChildren('mapCont') viewChildren!: QueryList<ElementRef>;

	public shows = [];

	public filter_status = [];
	public filter_area = [];
	public filter_discipline = [];
	public filter_level = [];

	constructor() {}

	possibeShowStatus =["Open", "Closed", "Full", "Completed"];

	possibleShowAreas =[
		{selectable: false, value:"North Island"},
		{selectable: true, value:"Northland"},
		{selectable: true, value:"Auckland"},
		{selectable: true, value:"Waikato"},
		{selectable: true, value:"Bay of Plenty"},
		{selectable: true, value:"Gisborne"},
		{selectable: true, value:"Hawke’s Bay"},
		{selectable: true, value:"Manawatu Wanganui"},
		{selectable: true, value:"Taranaki"},
		{selectable: true, value:"Whanganui"},
		{selectable: true, value:"Wairarapa"},
		{selectable: true, value:"Wellington"},
		{selectable: false, value:"South Island"},
		{selectable: true, value:"Nelson"},
		{selectable: true, value:"Marlborough"},
		{selectable: true, value:"Tasman"},
		{selectable: true, value:"West Coast"},
		{selectable: true, value:"Timaru"},
		{selectable: true, value:"Oamaru"},
		{selectable: true, value:"Canterbury"},
		{selectable: true, value:"Otago"},
		{selectable: true, value:"Southland"}
	];

	possibleShowDisciplines =["Dressage","Show Jumping","Show Hunter","Eventing","Derby","Training days","Western","A&P Showing","Ribbon Days","Para","Closed Pony club events","Mounted Games"];

	possibleShowLevelsEventing =["Intro (65cm)","Pre-training (80cm)","Training (95cm)","Open (105cm)"];

	possibleShowLevelsShowjumping =["X Bar","40cm","50cm","60cm","70cm","80cm","90cm","100cm","105cm","110cm","115cm","120cm","125cm","130cm"];

	possibleShowLevelsDressage =["Introductory (Non-graded)","Preliminary (level 1)","Novice (Level 2)","Elementary (Level 3)","Medium (Level 4)","Advanced Medium (Level 5)","Advanced (Level 6)"];

	get filteredShows() {
		let filteredShows = this.shows;
		if (this.filter_status.length > 0) {
			filteredShows = filteredShows.filter(show => this.filter_status.indexOf(show.status) > -1);
		}
		if (this.filter_area.length > 0) {
			filteredShows = filteredShows.filter(show => this.filter_area.indexOf(show.area) > -1);
		}
		if (this.filter_discipline.length > 0) {
			filteredShows = filteredShows.filter(show => this.filter_discipline.indexOf(show.discipline) > -1);
		}
		if (this.filter_level.length > 0) {
			filteredShows = filteredShows.filter(show => this.filter_level.indexOf(show.level) > -1);
		}
		return filteredShows;
	}

	processStatusSelection(status: string) {
		const exists = this.filter_status.findIndex((item) => item === status);
		if (exists > -1) {
			this.filter_status.splice(exists, 1);
		} else {
			this.filter_status.push(status);
		}
	}

	processAreaSelection(area: string) {
		const exists = this.filter_area.findIndex((item) => item === area);
		if (exists > -1) {
			this.filter_area.splice(exists, 1);
		} else {
			this.filter_area.push(area);
		}
	}

	processDisciplineSelection(discipline: string) {
		const exists = this.filter_discipline.findIndex((item) => item === discipline);
		if (exists > -1) {
			this.filter_discipline.splice(exists, 1);
			if (['Eventing'].indexOf(discipline) > -1) {
				this.filter_level = this.filter_level.filter((el) => {
					return this.possibleShowLevelsEventing.indexOf( el ) < 0;
				});
			}
			if (['Show Jumping', 'Dressage', 'Derby'].indexOf(discipline) > -1) {
				this.filter_level = this.filter_level.filter((el) => {
					return this.possibleShowLevelsShowjumping.indexOf( el ) < 0;
				});
			}
			if (['Dressage'].indexOf(discipline) > -1) {
				this.filter_level = this.filter_level.filter((el) => {
					return this.possibleShowLevelsDressage.indexOf( el ) < 0;
				});
			}
		} else {
			this.filter_discipline.push(discipline);
		}
	}

	processLevelSelection(level: string) {
		const exists = this.filter_level.findIndex((item) => item === level);
		if (exists > -1) {
			this.filter_level.splice(exists, 1);
		} else {
			this.filter_level.push(level);
		}
	}

	randomString(len) {
		const charSet = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
		var randomString = '';
		for (var i = 0; i < len; i++) {
			var randomPoz = Math.floor(Math.random() * charSet.length);
			randomString += charSet.substring(randomPoz,randomPoz+1);
		}
		return randomString;
	}

	ngOnInit() {
		setTimeout(() => {
			this.shows = [
				{
					uid: this.randomString(5),
					name: 'Prydes EasiFeed Winter Show Hunter Series - Day 2',
					closes: new Date('2021-04-22'),
					date: new Date('2021-05-01'),
					status: 'Open',
					discipline: 'Dressage',
					location: 'Woodhill Sands',
					area: 'Helensville',
					schedule_url: 'https://s3.amazonaws.com/EquestrianEntries/Schedules/NI%20SS%20Two%20Day%20Event.pdf',
					longitude: '-36.72735',
					latitude: '174.43778',
					level: 'Introductory (Non-graded)'
				},
				{
					uid: this.randomString(5),
					name: 'Prydes EasiFeed Winter Show Hunter Series - Day 2',
					closes: new Date('2021-04-22'),
					date: new Date('2021-05-01'),
					status: 'Closed',
					discipline: 'Dressage',
					location: 'Woodhill Sands',
					area: 'NorthLand',
					schedule_url: 'https://s3.amazonaws.com/EquestrianEntries/Schedules/NI%20SS%20Two%20Day%20Event.pdf',
					longitude: '-36.72735',
					latitude: '174.43778',
					level: 'Introductory (Non-graded)'
				},
				{
					uid: this.randomString(5),
					name: 'Prydes EasiFeed Winter Show Hunter Series - Day 2',
					closes: new Date('2021-04-22'),
					date: new Date('2021-05-01'),
					status: 'Completed',
					discipline: 'Dressage',
					location: 'Woodhill Sands',
					area: 'Waikato',
					schedule_url: 'https://s3.amazonaws.com/EquestrianEntries/Schedules/NI%20SS%20Two%20Day%20Event.pdf',
					longitude: '-36.72735',
					latitude: '174.43778',
					level: 'Introductory (Non-graded)'
				},
				{
					uid: this.randomString(5),
					name: 'Prydes EasiFeed Winter Show Hunter Series - Day 2',
					closes: new Date('2021-04-22'),
					date: new Date('2021-05-01'),
					status: 'Open',
					discipline: 'Dressage',
					location: 'Woodhill Sands',
					area: 'South Land',
					schedule_url: 'https://s3.amazonaws.com/EquestrianEntries/Schedules/NI%20SS%20Two%20Day%20Event.pdf',
					longitude: '-36.72735',
					latitude: '174.43778',
					level: 'Introductory (Non-graded)'
				},
				{
					uid: this.randomString(5),
					name: 'Prydes EasiFeed Winter Show Hunter Series - Day 2',
					closes: new Date('2021-04-22'),
					date: new Date('2021-05-01'),
					status: 'Open',
					discipline: 'Dressage',
					location: 'Woodhill Sands',
					area: 'Helensville',
					schedule_url: 'https://s3.amazonaws.com/EquestrianEntries/Schedules/NI%20SS%20Two%20Day%20Event.pdf',
					longitude: '-36.72735',
					latitude: '174.43778',
					level: 'Introductory (Non-graded)'
				},
				{
					uid: this.randomString(5),
					name: 'Prydes EasiFeed Winter Show Hunter Series - Day 2',
					closes: new Date('2021-04-22'),
					date: new Date('2021-05-01'),
					status: 'Open',
					discipline: 'Dressage',
					location: 'Woodhill Sands',
					area: 'Dargavill',
					schedule_url: 'https://s3.amazonaws.com/EquestrianEntries/Schedules/NI%20SS%20Two%20Day%20Event.pdf',
					longitude: '-36.72735',
					latitude: '174.43778',
					level: 'Introductory (Non-graded)'
				},
				{
					uid: this.randomString(5),
					name: 'Prydes EasiFeed Winter Show Hunter Series - Day 2',
					closes: new Date('2021-04-22'),
					date: new Date('2021-05-01'),
					status: 'Open',
					discipline: 'Dressage',
					location: 'Woodhill Sands',
					area: 'Helensville',
					schedule_url: 'https://s3.amazonaws.com/EquestrianEntries/Schedules/NI%20SS%20Two%20Day%20Event.pdf',
					longitude: '-36.72735',
					latitude: '174.43778',
					level: 'Introductory (Non-graded)'
				}
			];
		}, 200);
	}

	ngAfterViewInit() {
		this.viewChildren.changes.subscribe((children) => {
			for (let index = 0; index < children.length; index++) {
				const element = children.get(index).nativeElement;
				children.get(index).nativeElement.innerHTML = '';
				const map = new Map({
					target: element,
					layers: [
					  new TileLayer({
						source: new OSM()
					  })
					],
					controls: [],
					view: new View({
					  center: fromLonLat([this.shows[index].latitude, this.shows[index].longitude]),
					  zoom: 8
					})
				});
			}
		  });
	}
}
