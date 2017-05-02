<?php
$url = "http://www.google.com/feed";
$xml = file_get_contents($url);
header("Content-type: application/xml; charset=UTF-8");
print $xml;
