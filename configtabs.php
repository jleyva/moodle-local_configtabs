<?php

// This file is part of Moodle - http://moodle.org/
//
// Moodle is free software: you can redistribute it and/or modify
// it under the terms of the GNU General Public License as published by
// the Free Software Foundation, either version 3 of the License, or
// (at your option) any later version.
//
// Moodle is distributed in the hope that it will be useful,
// but WITHOUT ANY WARRANTY; without even the implied warranty of
// MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE.  See the
// GNU General Public License for more details.
//
// You should have received a copy of the GNU General Public License
// along with Moodle.  If not, see <http://www.gnu.org/licenses/>.

include_once('../../config.php');
?>

<link rel="stylesheet" type="text/css" href="<?php echo $CFG->wwwroot; ?>/lib/yui/fonts/fonts-min.css" /> 
<link rel="stylesheet" type="text/css" href="<?php echo $CFG->wwwroot; ?>/lib/yui/tabview/assets/skins/sam/tabview.css" /> 
<script type="text/javascript" src="<?php echo $CFG->wwwroot; ?>/lib/yui/yahoo-dom-event/yahoo-dom-event.js"></script> 
<script type="text/javascript" src="<?php echo $CFG->wwwroot; ?>/lib/yui/element/element-beta-min.js"></script> 
<script type="text/javascript" src="<?php echo $CFG->wwwroot; ?>/lib/yui/tabview/tabview-min.js"></script> 	
	
<?php
$addfields = (isset($_POST['boundary_add_fields']) || isset($_GET['boundary_add_fields']))? 'true' : 'false';

echo '	<script type="text/javascript"> 
			var configtabsAddFields = '.$addfields.';
		</script>';

?>
<script type="text/javascript" src="<?php echo $CFG->wwwroot; ?>/local/configtabs/configtabs.js"></script> 
