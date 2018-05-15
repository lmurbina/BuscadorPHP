<?php

$action = $_GET['action'];
if ($action == 'getAllCities'){
	$cities = getAllCities();
	echo json_encode($cities);
}
if ($action == 'getAllTypes'){
	$types = getAllTypes();
	echo json_encode($types);
}

function getAllCities(){
	$data_file = fopen('../data-1.json','r');
	$data_readed = fread($data_file, filesize('../data-1.json'));
	$data = json_decode($data_readed, true);
	$cities = array();

	foreach ($data as $key => $value) {
		$cities[$key] = $value['Ciudad'];
	}

	$cities = array_unique($cities);
	fclose($data_file);
	return $cities;
}

function getAllTypes(){
	$data_file = fopen('../data-1.json','r');
	$data_readed = fread($data_file, filesize('../data-1.json'));
	$data = json_decode($data_readed, true);
	$types = array();

	foreach ($data as $key => $value) {
		$types[$key] = $value['Tipo'];
	}

	$types = array_unique($types);
	fclose($data_file);
	return $types;
}


?>