<?php
require_once("./php/locale.php");
require_once("./php/db.php");
?>
<!DOCTYPE HTML PUBLIC "-//W3C//DTD HTML 4.01 Transitional//EN">
<html xmlns="http://www.w3.org/1999/xhtml">
  <head>
    <title>OpenFlights.org: <?php echo _("Flight logging, mapping, stats and sharing") ?></title>
    <meta name="description" content="Free open-source tool for logging, mapping, calculating and sharing your flights and trips.">
    <meta name="keywords" content="flight,memory,logging,mapping,statistics,sharing">
    <link rel="stylesheet" href="/css/style_reset.css" type="text/css">
    <link rel="stylesheet" href="/openflights.css?version=20080608" type="text/css">
    <link rel="gettext" type="application/x-po" href="/locale/<?php echo $locale?>/LC_MESSAGES/messages.po?20090615" />
    <link rel="icon" type="image/png" href="/img/icon_favicon.png"/>
    <script type="text/javascript" src="/OpenLayers.js?version=20090201"></script>
    <script type="text/javascript" src="/js/greatcircle.js?version=20090608"></script>
    <script type="text/javascript" src="/js/utilities.js?version=20090326"></script>
    <script type="text/javascript" src="/js/Gettext.js"></script>
    <script type="text/javascript" src="/js/scw.js"></script>
    <script type="text/javascript" src="/js/prototype.js?version=20090326"></script>
    <script type="text/javascript" src="/js/scriptaculous.js?version=20090326"></script>
    <script type="text/javascript" src="/openflights.js?version=20090619"></script>
  </head>

  <body>

    <div id="mainContainer">
      <div id="sideBarContentWrapper">
	<div id="contentContainer">
	  <div id="map" class="smallmap"></div>

	    <div id="newairport" style="display: none">
              <?php echo _("Duration") ?> <input type="text" id="duration" size="5" style="text-align: right; background-color: transparent;" onChange="JavaScript:calcDuration('DURATION');" value=""/>
              <?php echo _("Distance") ?> <input type="text" id="distance" size="5" style="text-align: right; background-color: transparent;" onChange="JavaScript:calcDuration('DISTANCE');" value=""/> mi&nbsp;&nbsp;
	      <input type="button" value="<?php echo _("Add new airport") ?>" align="middle" onclick='JavaScript:popNewAirport(null)'>	    
	    </div>

	      <div id="maptitle"><noscript><?php echo _("Sorry, OpenFlights requires JavaScript.") ?></noscript>
	    </div>

	    <div id="news" style="display: none">
	      <img src="/img/close.gif" height=17 width=17 onClick='JavaScript:closeNews()'>
	      <B><?php echo _("News")?> </b>: 19 Jun 2009: <a href="/blog/">Language selector now available for public profile, trips</a>
	    </div>
	    
	    <div id="ajaxloader">
	      <span id="ajaxstatus" style="display: none"><img src="/img/ajax-wait.gif" height=100 width=100/></span>
	    </div>
	    
	  </div>


	  <div id="sideBar">
	    <?php include("./sidebar.html") ?>
	    <div id="login">
	      <div id="langselect" style="display: block; text-align: right; margin-bottom: 10px">
                <?php echo locale_pulldown($db, $locale) ?>
	      </div>

	      <div id="loginstatus" style="display: none"></div>
 
	      <div id="loginform" style="display: none">
		<form name="login">
		<table cellspacing="5" cellpadding="0" border="0">
 		  <tr>
                    <td><?php echo _("Username") ?>&nbsp;</td><td>
		      <input type="Text" name="name" align="top" size="10" tabindex="1">
		    </td>
		  </tr><tr>
		  <td align=right><?php echo _("Password") ?>&nbsp;</td><td>
		      <input type="password" name="pw" align="top" size="10" tabindex="2" onKeyPress='JavaScript:submitEnter(event)' onChange='submitEnter("CHANGE")'>	    
 		      <input type="hidden" name="challenge">    
		    </td>
		  </tr><tr>
		    <td></td>
		    <td>
		      <input type="button" value="<?php echo _("Log in") ?>" align="middle" tabindex="3" onclick='JavaScript:xmlhttpPost("/php/login.php")'>
		      <a href="/html/settings?new=yes"><h7><?php echo _("Sign up") ?></a></h7>
		    </td>
		  </tr></table>
	      </form>
	      </div>
	    </div> <!-- login -->
	    <div id="statsbox" style="visibility: hidden; clear: both">
	      <table style='width: 218px'>
		<tr><td style='vertical-align: top'>
		    <span id="stats"></span>
		    <span id="stats_ajax" style="display: none">&nbsp;<img src='/img/ajax-wait-small.gif' height=16 width=16/></span>
		  </td><td style='vertical-align: top; text-align: right; padding: 0px 5px'>
		    <input type="button" value="<?php echo _("Analyze") ?>" align="middle" onclick='JavaScript:xmlhttpPost("/php/stats.php")'><br>
		    <input type="button" value="<?php echo _("Top 10") ?>" align="middle" onclick='JavaScript:updateTop10()'>
		  </td>
		</tr></table>
	    </div>
	    
	    <div id="filter" style="visibility: hidden">
	      <form id='filterform'>
		<b><?php echo _("Filter") ?></b>
		<table>
		<tr>
		  <td><?php echo _("Carrier") ?>&nbsp;</td>
		  <td><span id="filter_airlineselect"><select class="filter" name="Airlines"><option value="">All carriers</option></select></span>
		</tr><tr>
		  <td><?php echo _("Year") ?></td>
		  <td><span id="filter_yearselect"><select class="filter" name="Years"><option value="">All</option></select></span></td>
		</tr><tr>
		  <td><?php echo _("Trip") ?><a href="#help" onclick='JavaScript:help("trip")'><img src="/img/icon_help.png" title="Help: What is a trip?" height=11 width=10></a></td>
		  <td><span id="filter_tripselect"></span>
		</tr><tr>
		  <td colspan=2><select style="width: 100px" id="filter_extra_key" name="Extra" onChange="JavaScript:setExtraFilter()" style="visibility: hidden">
		      <option value="" SELECTED><?php echo _("More...") ?></option>
		      <option value="class"><?php echo _("Class") ?></option>
		      <option value="distlt"><?php echo _("Distance") ?> &lt;</option>
		      <option value="distgt"><?php echo _("Distance") ?> &gt;</option>
		      <option value="mode"><?php echo _("Mode") ?></option>
		      <option value="note"><?php echo _("Note") ?></option>
		      <option value="reason"><?php echo _("Reason") ?></option>
		      <option value="reg"><?php echo _("Registration") ?></option>
		    </select></span> <span id="filter_extra_span"></span></td>
	        </tr>
	      </table>
	      </span>
	    </form>
	      

	      <div id="controlpanel" style="display: none">
  		<br><b><?php echo _("Control panel") ?></b><br>
	 	<input type="button" value="<?php echo _("New flight") ?>" align="middle" onclick='JavaScript:newFlight()'>
		<input type="button" value="<?php echo _("List flights") ?>" align="middle" onclick='JavaScript:startListFlights()'>
		<input type="button" value="<?php echo _("Import") ?>" align="middle" onclick='JavaScript:openImport()'>
		<input type="button" value="<?php echo _("Settings") ?>" align="middle" onclick='JavaScript:settings()'>
		<input type="button" value="<?php echo _("Logout") ?>" align="middle" onclick='JavaScript:xmlhttpPost("/php/logout.php")'>
	      </div>

	    </div>
	    
	  </div> <!-- end sidebar -->
	</div> <!-- end sidebarwrapper -->

	<div id="resultbox">
	  <div id="ad" style="display: inline;">
	    <?php include("./html/ad.html") ?>
	  </div>

	  <div id="help" style="display: none;">
<h2><img src="/img/close.gif" height=17 width=17 onClick='JavaScript:closePane()'> OpenFlights Map Help <small>&mdash; Didn't answer your question?  Try the <a href="faq.html" target="_blank">FAQ</a>.</small></h2>
<p><b>View airport</b>: Click on an airport <img src="/img/icon_plane-15x15.png" height=15 width=15> to view details.  Click on <img src="/img/close.gif" height=17 width=17> or another airport to close the pop-up.<br>
<b>Move around</b>: Use <img src="/img/north-mini.png" height=18 width=18><img src="/img/west-mini.png" height=18 width=18><img src="/img/east-mini.png" height=18 width=18><img src="/img/south-mini.png" height=18 width=18> buttons (top left) or click and drag your mouse.<br>
<b>Zoom in/out</b>: Use <img src="/img/zoom-plus-mini.png" height=18 width=18><img src="/img/zoom-minus-mini.png" height=18 width=18>, roll your mouse wheel, or double-click on the point you want to zoom to.  For the full world view, click <img src="/img/zoom-world-mini.png" height=18 width=18>.<br>
<b>Select region</b>: Click on <img src="/img/drag-rectangle-off.png" width=18 height=18>, then draw a rectangle.  Click on <img src="/img/panning-hand-off.png" width=18 height=18> to return to normal (panning) mode.<br>
<b>Map options</b>: To choose your map type and what to show on it, click on the top right <img src="/img/layer-switcher-maximize.png" height=18 width=18>.<br>
<b>Minimap</b>: To activate the mini-map control, click on bottom right <img src="/img/layer-switcher-maximize.png" height=18 width=18>.</p>
	  </div> <!-- end help -->
	  <div id="input" style="display: none;">
<h2><img src="/img/close.gif" height=17 width=17 onClick='JavaScript:closeInput()'>
    <span id="addflighttitle"><?php echo _("Add new flight") ?></span>
    <span id="editflighttitle" style="display: none"><?php echo _("Edit flight") ?></span>
    <small>&mdash; <?php echo _("Fields in <font color='blue'>blue</font> are required.  Click on airports in the map to select them or search by city name or airport code.") ?></small>

</h2>
<p></p>

<form id='inputform'>
<table>
<tr>
  <td><font color="blue"><?php echo _("Date") ?></font></td>
  <td colspan=2><input type="text" name="src_date" id="src_date" size="11" class="date" tabindex="11" onChange="JavaScript:calcDuration('DEPARTURE');"/> <img src="/img/scw.gif" height="15" width="16" onclick="scwShow(scwID('src_date'),event); calcDuration('DEPARTURE');" />
<input type="text" name="src_time" id="src_time" tabindex="12" size="5" class="miniTextbox" value="HH:MM" onChange="JavaScript:calcDuration('DEPARTURE')"/> &rarr;
<input type="text" name="dst_time" id="dst_time" size="5" class="miniTextbox" value="HH:MM" onChange="JavaScript:calcDuration('ARRIVAL')"/>
<input type="text" name="dst_days" id="dst_days" size="6" value="" style="border: 0px; display: none" onChange="JavaScript:markAsChanged()"/><img src="/img/icon_clock.png" id="icon_clock" title="<?php echo _("Departure and arrival time") ?>" height="16" width="16" onclick='JavaScript:help("time")'/>
  </td>

  <td><?php echo _("Trip") ?><a href="#help" onclick='JavaScript:help("trip")'><img src="/img/icon_help.png" title="Help: What is a trip?" height=11 width=10></a></td>
  <td width=""><span id="input_trip_select"></span> <img src="/img/icon_add.png" title="<?php echo _("Add new trip") ?>" height=17 width=17 onclick='JavaScript:editTrip("ADD")'/><img src="/img/icon_edit.png" title="<?php echo _("Edit this trip") ?>" height=17 width=17 onclick='JavaScript:editTrip("EDIT")'/></td>

</tr><tr>
  <td><font color="blue"><?php echo _("From") ?></font><a href="#help" onclick='JavaScript:help("airport")'><img src="/img/icon_help.png" title="Help: How do I enter airports?" height=11 width=10></a></td>
  <td><input type="text" name="src_ap" id="src_ap" size="60" tabindex="14" onChange='JavaScript:airportCodeToAirport("src_ap")' class="hintTextbox" value="<?php echo _("Enter city name or airport code") ?>"/><div id="src_apAC"></div>
      <input type="hidden" name="src_apid" id="src_apid"/></td>
  <td rowspan=2 valign=middle align=left>
    <img src="/img/icon_plane-src.png" title="<?php echo _("Airport search") ?>" height=17 width=17 onclick='JavaScript:popNewAirport("src_ap")'/ style="margin-left: 5px"/> <img src="/img/swap-icon.png" title="<?php echo _("Swap To and From airports") ?>" height=17 width=17 onclick='JavaScript:swapAirports(true)' style="margin-right: 10px"/><br>
    <img src="/img/icon_plane-dst.png" title="<?php echo _("Airport search") ?>" height=17 width=17 onclick='JavaScript:popNewAirport("dst_ap")'/ style="margin-left: 5px"/>
  </td>

  <td><?php echo _("Plane") ?></td>
  <td><input style="width: 180px" type="text" name="plane" id="plane" tabindex="111" onChange="JavaScript:markAsChanged();" class="hintTextbox" value="<?php echo _("Enter plane model") ?>"><div id="planeAC"></div><input type="hidden" id="plane_id" name="plane_id" />
      <?php echo _("Reg.") ?> <input type="text" name="registration" size="8" tabindex="112" onChange="JavaScript:markAsChanged();"/>
  </td>

</tr><tr>
  <td><font color="blue"><?php echo _("To") ?></font><a href="#help" onclick='JavaScript:help("airport")'><img src="/img/icon_help.png" title="Help: How do I enter airports?" height=11 width=10></a></td>
  <td><input type="text" name="dst_ap" id="dst_ap" size="60" tabindex="15" onChange='JavaScript:airportCodeToAirport("dst_ap")' class="hintTextbox" value="<?php echo _("Enter city name or airport code") ?>"/><div id="dst_apAC"></div>
      <input type="hidden" name="dst_apid" id="dst_apid"/></td>

  <td><?php echo _("Class") ?></td>
  <td><input type="radio" name="myClass" value="Y" onChange="JavaScript:markAsChanged();" CHECKED><?php echo _("Economy") ?>
      <input type="radio" name="myClass" value="P" onChange="JavaScript:markAsChanged();"><?php echo _("Premium Eco.") ?>
      <input type="radio" name="myClass" value="C" onChange="JavaScript:markAsChanged();"><?php echo _("Business") ?>
      <input type="radio" name="myClass" value="F" onChange="JavaScript:markAsChanged();"><?php echo _("First") ?>
  </td>

</tr><tr>
  <td><select name="mode" tabindex="16" onChange="JavaScript:changeMode();">
      <option value="F"><?php echo _("Flight") ?></option>
      <option value="R"><?php echo _("Road") ?></option>
      <option value="S"><?php echo _("Ship") ?></option>
      <option value="T"><?php echo _("Train") ?></option>
    </select></td>
  <td colspan="2">&nbsp;<?php echo _("Nr.") ?>&nbsp;<input type="text" name="number" size="7" value="" tabindex="17" onChange='JavaScript:flightNumberToAirline("NUMBER")'/> <?php echo _("Seat") ?> <input type="text" name="seat" size="4" tabindex="18" onChange="JavaScript:markAsChanged();"/>
    <?php echo _("Type") ?> <select name="seat_type" tabindex="19" onChange="JavaScript:markAsChanged();">
        <option value="-">-</option>
        <option value="W"><?php echo _("Window") ?></option>
        <option value="A"><?php echo _("Aisle") ?></option>
        <option value="M"><?php echo _("Middle") ?></option>
      </select>
  </td>

  <td><?php echo _("Reason") ?>&nbsp;</td>
  <td><input type="radio" name="reason" value="B" onChange="JavaScript:markAsChanged();" CHECKED><?php echo _("Work") ?>
      <input type="radio" name="reason" value="L" onChange="JavaScript:markAsChanged();"><?php echo _("Leisure") ?>
      <input type="radio" name="reason" value="C" onChange="JavaScript:markAsChanged();"><?php echo _("Crew") ?>
      <input type="radio" name="reason" value="O" onChange="JavaScript:markAsChanged();"><?php echo _("Other") ?>
  </td>

</tr><tr>
  <td><?php echo _("Carrier") ?><a href="#help" onclick='JavaScript:help("airline")'><img src="/img/icon_help.png" title="Help: How do I enter airlines?" height=11 width=10></a></td>
  <td><input type="text" name="airline" id="airline" size="60" tabindex="20" onChange='JavaScript:flightNumberToAirline("airline")' class="hintTextbox" value="<?php echo _("Enter airline name or code") ?>"/><div id="airlineAC"></div>
      <input type="hidden" name="airlineid" id="airlineid"/> </td>
  <td><img id="icon_airline" src="/img/icon_airline.png" title="<?php echo _("Airline search") ?>" height=17 width=17 onclick='JavaScript:popNewAirline("airline")' style="margin-left: 5px"/>
  </td>

  <td colspan=2><span id="input_status"></span></td>

</tr><tr>
  <td><?php echo _("Note") ?></td>
  <td colspan=2><input type="text" name="note" id="note" size="60" tabindex="21" class="hintTextbox" value="" onChange="JavaScript:markAsChanged();"></td>
  <td colspan=2 align=right>
    <span id="addflightbuttons">
      <input id="b_add" value="<?php echo _("Add") ?>" title="<?php echo _("Save this flight") ?>" type="button" tabindex="120" onclick='JavaScript:submitFlight();'>
      <input id="b_clear" value="<?php echo _("Clear") ?>" title="<?php echo _("Reset this entry form") ?>" type="button" tabindex="121" onclick='JavaScript:clearInput()'>
      <input id="b_exit" value="<?php echo _("Exit") ?>" title="<?php echo _("Exit flight editor") ?>" type="button" tabindex="122" onclick='JavaScript:closeInput()'>
    </span>
    <span id="editflightbuttons" style="display: none">
      <input id="b_save" value="<?php echo _("Save changes") ?>" title="<?php echo _("Save changes made to this flight") ?>" type="button" tabindex="120" onclick='JavaScript:saveFlight()'>
      <input id="b_delete" value="<?php echo _("Delete") ?>" title="<?php echo _("Delete this flight") ?>" type="button" tabindex="121" onclick='JavaScript:deleteFlight()'>
      <input id="b_cancel" value="<?php echo _("Exit") ?>" title="<?php echo _("Exit flight editor") ?>" type="button" tabindex="122" onclick='JavaScript:closeInput()'>
      <input id="b_prev" title="<?php echo _("Previous flight") ?>" value="&nbsp;<&nbsp;" type="button" tabindex="123" onclick='JavaScript:editPointer(-1)'>
      <input id="b_next" title="<?php echo _("Next flight") ?>" value="&nbsp;&gt;&nbsp;" type="button" tabindex="124" onclick='JavaScript:editPointer(1)'>
    </span>
    <span style='position: absolute; right: 20px'><input id="b_basic" title="<?php echo _("Switch to basic editor") ?>" value="<?php echo _("Basic") ?>" type="button" tabindex="150" onclick='JavaScript:openBasicInput();'></span>
  </td>
</tr>
</table>

</form>

	</div>

	  <div id="multiinput" style="display: none;">
<h2><img src="/img/close.gif" height=17 width=17 onClick='JavaScript:closeInput()'> <?php echo _("Add new flights") . "<small>&mdash; " . _("Fields in <font color='blue'>blue</font> are required.  Click on airports in the map to select them or search by city name or airport code.") ?></small></h2>
<p></p>

<form id='multiinputform'>
<table>
<tr>
  <td><font color="blue"><?php echo _("From") ?></font><a href="#help" onclick='JavaScript:help("airport")'><img src="/img/icon_help.png" title="Help: How do I enter where I flew from?" height=11 width=10></a></td>
  <td><font color="blue"><?php echo _("To") ?></font><a href="#help" onclick='JavaScript:help("airport")'><img src="/img/icon_help.png" title="Help: How do I enter where I flew to?" height=11 width=10></a></td>
  <td><?php echo _("Airline") ?><a href="#help" onclick='JavaScript:help("airline")'><img src="/img/icon_help.png" title="Help: How do I enter the airline?" height=11 width=10></a></td>
  <td><?php echo _("Date") ?></td>
</tr>
<?php
for($row = 1; $row <= 4; $row++) {
  echo "<tr id='row$row' " . ($row > 1 ? "style='display: none;'" : "") . "> <!-- Row $row -->\n";
  printf("<td><input type='text' name='src_ap%s' id='src_ap%s' size='32' tabindex='1%s1' onChange='JavaScript:airportCodeToAirport(\"src_ap%s\")' class='hintTextbox' value=\"%s\"/><span id='src_apAC$row'></span>\n", $row, $row, $row, $row, _("Enter city name or airport code"));
  printf("<input type='hidden' name='src_ap%sid' id='src_ap%sid'>\n", $row, $row);
  printf("<img src='/img/icon_plane-src.png' title=\"%s\" height=17 width=17 onclick='JavaScript:popNewAirport(\"src_ap$row\")'/ style='margin-right: 5px'/></td>\n", _("Airport search"));
  printf("<td><input type='text' name='dst_ap%s' id='dst_ap%s' size='32' tabindex='1%s2' onChange='JavaScript:airportCodeToAirport(\"dst_ap%s\")' class='hintTextbox' value=\"%s\"/><span id='dst_apAC%s'></span>\n", $row, $row, $row, $row, _("Enter city name or airport code"), $row);
  printf ("<input type='hidden' name='dst_ap1%s' id='dst_ap%sid'/>\n", $row, $row);
  printf ("<img src='/img/icon_plane-dst.png' title='%s' height=17 width=17 onclick='JavaScript:popNewAirport(\"dst_ap$row\")' style='margin-right: 5px'/></td>\n", _("Airport search"));
  printf ("<td><input type='text' name='airline%s' id='airline%s' size='32' tabindex='1%s3' onChange='JavaScript:flightNumberToAirline(\"airline$row\")' class='hintTextbox' value=\"%s\"/><span id='airlineAC$row'></span>\n", $row, $row, $row,
	  _("Enter airline name or code"));
  printf ("<input type='hidden' name='airline%sid' id='airline%sid'/><img src='/img/icon_airline.png' title='%s' height=17 width=17 onclick='JavaScript:popNewAirline(\"airline1\")'/ style='margin-right: 5px'/></td>\n", $row, $row, _("Airline search"));
  printf ("<td><input type='text' name='src_date%s' id='src_date%s' size='11' class='date' tabindex='1%s4' onChange='JavaScript:markAsChanged()';/><img src='/img/scw.gif' height='15' width='16' onclick='scwShow(scwID(\"src_date%s\"),event); markAsChanged();' style='margin-left: 5px'/></td></tr>\n", $row, $row, $row, $row);
}
?>
<tr>
<td colspan=4 style="padding-top: 0.5em">
  <input id="b_multi_add" title="<?php echo _("Save these flights") ?>" value="<?php echo _("Add") ?>" type="button" tabindex="140" onclick='JavaScript:submitFlight();'>
  <input id="b_multi_clear" title="<?php echo _("Reset this entry form") ?>" value="<?php echo _("Clear") ?>" type="button" tabindex="141" onclick='JavaScript:clearInput()'>
  <input id="b_multi_exit" title="<?php echo _("Exit without saving") ?>" value="<?php echo _("Exit") ?>" type="button" tabindex="142" onclick='JavaScript:closeInput()'>
  <span id="multiinput_status"></span>
  <span style='position: absolute; right: 20px'>
    <input id="b_more" title="<?php echo _("Add new row for faster entry of multiple flights") ?>" value="<?php echo _("More") ?>" type="button" tabindex="143" onclick='JavaScript:changeRows("More");'>
    <input id="b_less" title="<?php echo _("Remove a row") ?>" value="<?php echo _("Less") ?>" type="button" tabindex="144" onclick='JavaScript:changeRows("Less");' disabled>
    <input id="b_detailed" title="<?php echo _("Switch to detailed editor") ?>" value="<?php echo _("Detailed") ?>" type="button" tabindex="145" onclick='JavaScript:openDetailedInput("ADD");'>
  </span>
</td>
</tr></table>
</form>
	</div>

	<div id="result" style="display: none;"></div>

      </div> <!-- end resultbox -->
    </div> <!-- end mainContainer -->

  </body>
</html>
