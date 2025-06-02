<script lang="ts">
	import Commute from '~icons/material-symbols/commute';
	import Assignment from '~icons/material-symbols/assignment';
	import Train from '~icons/material-symbols/train';
	import Inventory from '~icons/material-symbols/inventory';
	import RailwayAlert from '~icons/material-symbols/railway-alert';
	import StickyNote2 from '~icons/material-symbols/sticky-note-2';
	import Contract from '~icons/material-symbols/contract';
	import AssignmentInd from '~icons/material-symbols/assignment-ind';
	import ClinicalNotes from '~icons/material-symbols/clinical-notes';
	import Box from '~icons/material-symbols/box';
	import LocalShipping from '~icons/material-symbols/local-shipping';
	import LocationOn from '~icons/material-symbols/location-on';
	import LocationHome from '~icons/material-symbols/location-home';
	import Subway from '~icons/material-symbols/subway';
	import Warehouse from '~icons/material-symbols/warehouse';
	import Map from '~icons/material-symbols/map';
	import LocationCity from '~icons/material-symbols/location-city';
	import HomeWork from '~icons/material-symbols/home-work';
	import Road from '~icons/material-symbols/road';
	import HolidayVillage from '~icons/material-symbols/holiday-village';
	import Encrypted from '~icons/material-symbols/encrypted';
	import Groups from '~icons/material-symbols/groups';
	import Group from '~icons/material-symbols/group';
	import Person from '~icons/material-symbols/person';
	import Passkey from '~icons/material-symbols/passkey';
	import KeyVertical from '~icons/material-symbols/key-vertical';
	import BarChart from '~icons/material-symbols/bar-chart';
	import ShowChart from '~icons/material-symbols/show-chart';
	import PieChartOutline from '~icons/material-symbols/pie-chart-outline';

	const icons: Record<string, any> = {
		commute: Commute,
		assignment: Assignment,
		train: Train,
		inventory: Inventory,
		'railway-alert': RailwayAlert,
		'sticky-note-2': StickyNote2,
		contract: Contract,
		'assignment-ind': AssignmentInd,
		'clinical-notes': ClinicalNotes,
		box: Box,
		'local-shipping': LocalShipping,
		'location-on': LocationOn,
		'location-home': LocationHome,
		subway: Subway,
		warehouse: Warehouse,
		map: Map,
		'location-city': LocationCity,
		'home-work': HomeWork,
		road: Road,
		'holiday-village': HolidayVillage,
		encrypted: Encrypted,
		groups: Groups,
		group: Group,
		person: Person,
		passkey: Passkey,
		'key-vertical': KeyVertical,
		'bar-chart': BarChart,
		'show-chart': ShowChart,
		'pie-chart-outline': PieChartOutline
	};

	export let icon: string;
	export let style: string | undefined = undefined;
</script>

<svelte:component this={icons[icon]} {style} />
