//~~~~~~~~~~~~~~~~ Report #1    START  ~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~

function buildSltMeasureProfile () {
	$(".loader-wrapper").fadeIn("fast");
	
	//get array		
		getMeasureProfileJSON();
		
		arr = measureProfileJSON.filter(a=>a.scorecardLabel == "Balance Scorecard" || a.scorecardLabel == "Mission Integration Scorecard" || a.scorecardLabel == "Safety & Quality Scorecard" || a.scorecardLabel == "NCACH Scorecard")
				.map(function(a) {
						return { 'scorecardLabel':a.scorecardLabel							
							, 'dataEnteredBy':a.dataEnteredBy
							, 'measureSltOwner':a.measureSltOwner
							, 'lastUpdate':a.lastUpdate
							, 'departmentName':a.departmentName
							, 'qmsMeasure':a.qmsMeasure
							, 'measureTypeDesc':a.measureTypeDesc
							, 'objective':a.objective
							, 'dataCollectionMethod':a.dataCollectionMethod
							, 'inclusionCriteria':a.inclusionCriteria
							, 'exclusionCriteria':a.exclusionCriteria
							, 'numeratorLabel':a.numeratorLabel
							, 'denominatorLabel':a.denominatorLabel
							, 'kpiLabel':a.kpiLabel
							, 'kpiCalc':a.kpiCalc
							, 'targetDesiredDirection':a.targetDesiredDirection
							, 'lastYearKpiValue':a.lastYearKpiValue
							, 'lastYearTargetValue':a.lastYearTargetValue};
						});
	console.log(arr);
	
	var txtTable = "";
	//Remove Existing Rows in HTML Table
		$('#tableReport1 > tbody').empty();
	
	//build out table
	for (var i = 0; i < arr.length; i++) {
			var	d = new Date(arr[i].lastUpdate.date);
			var dd = d.getDate();
			var mm = d.getMonth()+1;
			var yyyy = d.getFullYear();
			if (dd<10) {dd='0'+dd;}
			
		txtTable = txtTable + "<tr id='row1'>";
		txtTable = txtTable + "<td>" + arr[i].scorecardLabel + "</td>";			
		txtTable = txtTable + "<td>" + arr[i].dataEnteredBy + "</td>";		
		txtTable = txtTable + "<td>" + arr[i].measureSltOwner + "</td>";
		txtTable = txtTable + "<td>" + mm + '/' + dd + '/' + yyyy + "</td>";
		txtTable = txtTable + "<td>" + arr[i].departmentName + "</td>";
		txtTable = txtTable + "<td>" + arr[i].qmsMeasure + "</td>";
		txtTable = txtTable + "<td>" + arr[i].measureTypeDesc + "</td>";
		txtTable = txtTable + "<td>" + arr[i].objective + "</td>";
		txtTable = txtTable + "<td>" + arr[i].dataCollectionMethod + "</td>";
		txtTable = txtTable + "<td>" + arr[i].inclusionCriteria + "</td>";
		txtTable = txtTable + "<td>" + arr[i].exclusionCriteria + "</td>";
		txtTable = txtTable + "<td>" + arr[i].numeratorLabel + "</td>";
		txtTable = txtTable + "<td>" + arr[i].denominatorLabel + "</td>";
		txtTable = txtTable + "<td>" + arr[i].kpiLabel + "</td>";
		txtTable = txtTable + "<td>" + arr[i].kpiCalc + "</td>";
		txtTable = txtTable + "<td>" + arr[i].targetDesiredDirection + "</td>";
		txtTable = txtTable + "<td>" + arr[i].lastYearKpiValue + "</td>";
		txtTable = txtTable + "<td>" + arr[i].lastYearTargetValue + "</td>";
		txtTable = txtTable + "</tr>";
		
	};//End Loop
	
	//Display table
		$('#tableReport1 > tbody:last-child').append(txtTable);
		
	//Format Table with filterTable 		
		$(document).ready(function() {
	 		
  var table = $('#tableReport1').DataTable({	  
       orderCellsTop: true
              , dom: 'Bfrtip'
        , buttons: ['copy', 'csv', 'excel']
		, "bDestroy": true 				//remove existing dataTable reference
				, "order": [[0, "asc" ]]
        , initComplete: function () {

                            this.api().columns('.headFilter').every( function () {
                                var column = this;
                                var select = $('<select><option value=""></option></select>')
                                    .appendTo( $("#tableReport1 thead tr:eq(1) th").eq(column.index()).empty() )
                                    .on( 'change', function () {
                                        var val = $.fn.dataTable.util.escapeRegex(
                                            $(this).val()
                                        );

                                        column
                                            .search( val ? '^'+val+'$' : '', true, false )
                                            .draw();
                                    } );

                                column.data().unique().sort().each( function ( d, j ) {
                                    select.append( '<option value="'+d+'">'+d+'</option>' );
                                } );
                            } );
                        }
    } );
	
	$(".dataTables_filter").css("display", "none");
	
} );
	
	$(".loader-wrapper").fadeOut("slow");
	
	//call function to populate QMS based upon user selection & default to step 3
		buildOnClickEvent("tableReport1", 4, 5, 3);
}


//~~~~~~~~~~~~~~~~ Report #1    END  ~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~









//~~~~~~~~~~~~~~~~ Report #2    START  ~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~
function buildScorecardMeasuresTable() {						
	
	$(".loader-wrapper").fadeIn("slow");	
	
	//get array		
		getMetricQcJSON();		
		
	
	var txtTable = "";
	
	//Modify Header To reflect appropriate Month Value
		//Set Month & Year Values
		var x = new Date();	x.setMonth(x.getMonth()-1); var text1 = '(' + x.toLocaleString('default', { month: 'short' }) + ' ' + x.getFullYear() + ')';
		var x = new Date();	x.setMonth(x.getMonth()-2); var text2 = '(' + x.toLocaleString('default', { month: 'short' }) + ' ' + x.getFullYear() + ')';
		var x = new Date();	x.setMonth(x.getMonth()-3); var text3 = '(' + x.toLocaleString('default', { month: 'short' }) + ' ' + x.getFullYear() + ')';
		var x = new Date();	x.setMonth(x.getMonth()-4); var text4 = '(' + x.toLocaleString('default', { month: 'short' }) + ' ' + x.getFullYear() + ')';
	
		$("th").each(function(){$(this).html($(this).html().replace("from Last Month",text1).replace("from 2 Months Ago",text2).replace("from 3 Months Ago",text3).replace("from 4 Months Ago",text4));});
	
	
	//Remove Existing Rows in HTML Table
		$('#tableReport2 > tbody').empty();
	
	//build out table
	for (var i = 0; i < metricQcJSON.length; i++) {	
		var	d = new Date(metricQcJSON[i].maxLastUpdate.date);
			var dd = d.getDate();
			var mm = d.getMonth()+1;
			var yyyy = d.getFullYear();
			if (dd<10) {dd='0'+dd;}
		txtTable = txtTable + "<tr id='row1'>";
		txtTable = txtTable + "<td>" + metricQcJSON[i].departmentName + "</td>";				
		txtTable = txtTable + "<td>" + metricQcJSON[i].qmsMeasure + "</td>";		
		txtTable = txtTable + "<td>" + metricQcJSON[i].scorecardLabel + "</td>";
		txtTable = txtTable + "<td>" + mm + '/' + dd + '/' + yyyy + "</td>";
		txtTable = txtTable + "<td>" + metricQcJSON[i].qualityLiaisonDesc + "</td>";
		txtTable = txtTable + "<td>" + metricQcJSON[i].dataEnteredBy + "</td>";
		txtTable = txtTable + "<td>" + metricQcJSON[i].validatedBy + "</td>";
		txtTable = txtTable + "<td>" + metricQcJSON[i].measureSltOwner + "</td>";
		txtTable = txtTable + "<td>" + metricQcJSON[i].qcStatus + "</td>";
		txtTable = txtTable + "<td>" + metricQcJSON[i].numeratorMonthOne + "</td>";
		txtTable = txtTable + "<td>" + metricQcJSON[i].denominatorMonthOne + "</td>";
		txtTable = txtTable + "<td>" + metricQcJSON[i].numeratorMonthTwo + "</td>";
		txtTable = txtTable + "<td>" + metricQcJSON[i].denominatorMonthTwo + "</td>";
		txtTable = txtTable + "<td>" + metricQcJSON[i].numeratorMonthThree + "</td>";
		txtTable = txtTable + "<td>" + metricQcJSON[i].denominatorMonthThree + "</td>";
		txtTable = txtTable + "<td>" + metricQcJSON[i].numeratorMonthFour + "</td>";
		txtTable = txtTable + "<td>" + metricQcJSON[i].denominatorMonthFour + "</td>";
		txtTable = txtTable + "</tr>";
		
	};//End Loop
	
	//Display table
		$('#tableReport2 > tbody:last-child').append(txtTable);
		
	//Format Table with filterTable 		
		var table = $('#tableReport2').DataTable({	  
		   orderCellsTop: true
				  , dom: 'Bfrtip'
			, buttons: ['copy', 'csv', 'excel']
			, "bDestroy": true 				//remove existing dataTable reference
					, "order": [[3, "asc" ]]					
			, initComplete: function () {

								this.api().columns('.headFilter').every( function () {
									var column = this;
									var select = $('<select><option value=""></option></select>')
										.appendTo( $("#tableReport2 thead tr:eq(1) th").eq(column.index()).empty() )
										.on( 'change', function () {
											var val = $.fn.dataTable.util.escapeRegex(
												$(this).val()
											);

											column
												.search( val ? '^'+val+'$' : '', true, false )
												.draw();
										} );

									column.data().unique().sort().each( function ( d, j ) {
										select.append( '<option value="'+d+'">'+d+'</option>' );
									} );
								} );
							}
		} );
	
	//Hide DataTable Search Bar
		$(".dataTables_filter").css("display", "none");
	
	
	$(".loader-wrapper").fadeOut("slow");
	
	//call function to populate QMS based upon user selection & default to step 3
		buildOnClickEvent("tableReport2", 0, 1, 5);
}
//~~~~~~~~~~~~~~~~ Report #2    END  ~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~









//~~~~~~~~~~~~~~~~ Report #3    START  ~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~
function buildWhoUpdatedDataTable () {
	$(".loader-wrapper").fadeIn("slow");
	

	//get array		
		getWhoChangedMyDataJSON();		
		
	
	var txtTable = "";
	//Remove Existing Rows in HTML Table
		$('#tableReport3 > tbody').empty();
	
	//build out table
	for (var i = 0; i < whoChangedDataJSON.length; i++) {	
		var	d = new Date(whoChangedDataJSON[i].metricChangedOn.date);
			var dd = d.getDate();
			var mm = d.getMonth()+1;
			var yyyy = d.getFullYear();
			if (dd<10) {dd='0'+dd;}
		var	d2 = new Date(whoChangedDataJSON[i].measureChangedOn.date);
			var dd2 = d2.getDate();
			var mm2 = d2.getMonth()+1;
			var yyyy2 = d2.getFullYear();
			if (dd2<10) {dd2='0'+dd2;}
		txtTable = txtTable + "<tr id='row1'>";
		txtTable = txtTable + "<td>" + whoChangedDataJSON[i].departmentName + "</td>";				
		txtTable = txtTable + "<td>" + whoChangedDataJSON[i].qmsMeasure + "</td>";		
		txtTable = txtTable + "<td>" + whoChangedDataJSON[i].measureSltOwner + "</td>";
		txtTable = txtTable + "<td>" + whoChangedDataJSON[i].validatedBy + "</td>";		
		txtTable = txtTable + "<td>" + whoChangedDataJSON[i].dataEnteredBy + "</td>";
		txtTable = txtTable + "<td>" + whoChangedDataJSON[i].qualityLiaisonDesc + "</td>";		
		txtTable = txtTable + "<td>" + ' '  + "</td>";	
		txtTable = txtTable + "<td>" + whoChangedDataJSON[i].metricChangedBy + "</td>";
		txtTable = txtTable + "<td>" + mm + '/' + dd + '/' + yyyy + "</td>";
		txtTable = txtTable + "<td>" + whoChangedDataJSON[i].measureChangedBy + "</td>";
		txtTable = txtTable + "<td>" + mm2 + '/' + dd2 + '/' + yyyy2 + "</td>";
		txtTable = txtTable + "</tr>";
		
	};//End Loop
	
	//Display table
		$('#tableReport3 > tbody:last-child').append(txtTable);
		
	//Format Table with filterTable 		
		var table = $('#tableReport3').DataTable({	  
		   orderCellsTop: true
				  , dom: 'Bfrtip'
			, buttons: ['copy', 'csv', 'excel']
			, "bDestroy": true 				//remove existing dataTable reference
					, "order": [[0, "asc" ]]					
			, initComplete: function () {

								this.api().columns('.headFilter').every( function () {
									var column = this;
									var select = $('<select><option value=""></option></select>')
										.appendTo( $("#tableReport3 thead tr:eq(2) th").eq(column.index()).empty() )
										.on( 'change', function () {
											var val = $.fn.dataTable.util.escapeRegex(
												$(this).val()
											);

											column
												.search( val ? '^'+val+'$' : '', true, false )
												.draw();
										} );

									column.data().unique().sort().each( function ( d, j ) {
										select.append( '<option value="'+d+'">'+d+'</option>' );
									} );
								} );
							}
		} );
	
	//Hide DataTable Search Bar
		$(".dataTables_filter").css("display", "none");
	
	$(".loader-wrapper").fadeOut("slow");
}
//~~~~~~~~~~~~~~~~ Report #3    END  ~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~




//~~~~~~~~~~~~~~~~ Report #4    START  ~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~
function buildRolling12SnapshotReport () {
	$(".loader-wrapper").fadeIn("slow");
	

	//get array		
		getRolling12SnapshotJSON();	

	//Populate Dropdown Selections based on JSON Values
		arr = rolling12SnapshotJSON.map(a => a.departmentName);
			fillSelectOptions(arr,"rpt_departmentName");
		arr = rolling12SnapshotJSON.map(a => a.measureSltOwner);
			fillSelectOptions(arr,"rpt_measureSltOwner");
		arr = rolling12SnapshotJSON.map(a => a.scorecardLabel);
			fillSelectOptions(arr,"rpt_scorecardLabel");
	
	//Build Out Click Event
		$("#rpt_departmentName, #rpt_measureSltOwner, #rpt_scorecardLabel").change(function () {			
			arr = metaJSON.filter (a=>a[this.id.replace('rpt_','')] == this.options[this.selectedIndex].text)
							.sort(function(a,b){
								if(a.qmsMeasure < b.qmsMeasure) {return -1;}
								if(a.qmsMeasure > b.qmsMeasure) {return 1;}
								return 0;
								});
			buildRolling12DataTable(arr);
					
			if (this.id == "rpt_departmentName") {
				document.getElementById("rpt_measureSltOwner").selectedIndex = 0;
				document.getElementById("rpt_scorecardLabel").selectedIndex = 0;
			} else if (this.id == "rpt_measureSltOwner") {
				document.getElementById("rpt_departmentName").selectedIndex = 0;
				document.getElementById("rpt_scorecardLabel").selectedIndex = 0;
			} else if (this.id == "rpt_scorecardLabel") {
				document.getElementById("rpt_departmentName").selectedIndex = 0;
				document.getElementById("rpt_measureSltOwner").selectedIndex = 0;
			} 
			
		});
		
	$(".loader-wrapper").fadeOut("slow");
}
//~~~~~~~~~~~~~~~~ Report #4    END  ~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~




function buildRolling12DataTable(arr) {
	var txtTable = "";
	
	//Remove Existing Rows in Table
		$('#tableReport4b > tbody').empty();
	
	//build out the table
		for (var i = 0; i< arr.length; i+=3) {			
			txtTable = txtTable + "<tr id='row1'>";
			txtTable = txtTable + "<td style='width:33%;'><div id='rolling12rID" + arr[i].measureId + "'></td>";
			try {
				txtTable = txtTable + "<td style='width:33%;'><div id='rolling12rID" + arr[i+1].measureId + "'></td>";
			} catch {
				txtTable = txtTable + "";
			}
			
			try {
				txtTable = txtTable + "<td style='width:33%;'><div id='rolling12rID" + arr[i+2].measureId + "'></td>";
			} catch {
				txtTable = txtTable + "";
			}
			
			txtTable = txtTable + "</tr>";
			
		};//End Loop
	
	//Display table
		$('#tableReport4b > tbody:last-child').append(txtTable);
	
	//Loop through newly created table to build out graph 1 per row
		var rolling12Table = document.getElementById("tableReport4b");
		for (var i=0; i<rolling12Table.rows.length; i++) {			
			for (var j=0; j<rolling12Table.rows[i].cells.length; j++) {
				rolling12Chart (rolling12Table.rows[i].cells[j].firstChild.id.replace('rolling12rID',''));
			}
		}
}


function rolling12Chart(rID) {
	var dir = metaJSON.filter(a=>a.measureId == rID)[0].targetDesiredDirection;	
	var formatDecimals = metaJSON.filter(a=>a.measureId == rID)[0].targetDecimals;
	var formatType = metaJSON.filter(a=>a.measureId == rID)[0].targetFormatDesc;
	
	//if format is Percent - multiple value by 100
		if (formatType == "Percent") {
			var yValKPI = rolling12SnapshotJSON.filter(a=>a.measureId == rID)
											.sort((a,b) => a.monthValueDiff - b.monthValueDiff)
											.map(a=>a.kpiMetricValue*100);
			var yValTgt = rolling12SnapshotJSON.filter(a=>a.measureId == rID)
									.sort((a,b) => a.monthValueDiff - b.monthValueDiff)
									.map(a=>a.tgtMetricValue*100);
		} else {
			var yValKPI = rolling12SnapshotJSON.filter(a=>a.measureId == rID)
											.sort((a,b) => a.monthValueDiff - b.monthValueDiff)
											.map(a=>a.kpiMetricValue);
			var yValTgt = rolling12SnapshotJSON.filter(a=>a.measureId == rID)
									.sort((a,b) => a.monthValueDiff - b.monthValueDiff)
									.map(a=>a.tgtMetricValue);
		}
	
	var yMinKpi = Math.min.apply(null, yValKPI);
	var yMaxKpi = Math.max.apply(null, yValKPI);
	
	if (dir == "Down") {
		yBoundry = Array.apply(null, Array(yValKPI.length)).map( () => yMaxKpi);
	  } else {
		yBoundry = Array.apply(null, Array(yValKPI.length)).map( () => yMinKpi);
	  }
	  
	//apply text formatting based upon MetaJSON values
		if (formatType == "Percent") {
			var formatA = 'Target: %{y:.' + formatDecimals  + 'f}%<extra></extra>';
			var formatB = 'KPI: %{y:.' + formatDecimals + 'f}%<extra></extra>';			
		} else if (formatType == "Currency") {
			var formatA = 'Target: $%{y:.' + formatDecimals + 'f}<extra></extra>';
			var formatB = 'KPI: $%{y:.' + formatDecimals + 'f}<extra></extra>';
		} else {
			var formatA = 'Target: %{y:.' + formatDecimals + 'f}<extra></extra>';
			var formatB = 'KPI: %{y:.' + formatDecimals + 'f}<extra></extra>';
		}
	  
	var trace1 = {
		x: rolling12SnapshotJSON.filter(a=>a.measureId == rID)
								.sort((a,b) => a.monthValueDiff - b.monthValueDiff)
								.map(a=>a.monthValue.date)
	  , y: yValTgt
	  , type: 'scatter'
	  , line: { color: '#7a1c00', width: 4  }
	  , name: 'Target'
	  , fill: 'tonexty', fillcolor: 'rgba(162, 28, 0, .2)'
	  , hovertemplate: formatA
	};
	var trace2 = {
		x: rolling12SnapshotJSON.filter(a=>a.measureId == rID)
								.sort((a,b) => a.monthValueDiff - b.monthValueDiff)
								.map(a=>a.monthValue.date)
	  , y: yValKPI
	  , type: 'scatter'
	  , line: { color: '#5c6b73', width: 4  }
	  , name: 'KPI'
	  , hovertemplate: formatB
	};
	var trace3 = {
		x: rolling12SnapshotJSON.filter(a=>a.measureId == rID)
								.sort((a,b) => a.monthValueDiff - b.monthValueDiff)
								.map(a=>a.monthValue.date)
	  , y: yBoundry  
	  , type: 'scatter'
	  , name: 'Outside Target'
	  , showlegend: false
	  , line: { color: 'rgba(122, 28 , 0, .01)'  }
	  , hoverinfo: 'skip'
	};
	var data  = [trace3, trace1, trace2];
	
	
	if (metaJSON.filter(a=>a.measureId == rID)[0].targetDesiredDirection == "Down") {
		var tgtText = 'KPI should be <i><b style="color: #7a1c00;font-size: 18px;">below</b></i> the Target';
	} else if (metaJSON.filter(a=>a.measureId == rID)[0].targetDesiredDirection == "Up") {
		var tgtText = 'KPI should be <i><b style="color: #7a1c00;font-size: 18px;">above</b></i> the Target';
	} else {
		var tgtText = 'Target direction not specified'	;
	}
	
	
	var layout = {
		title: {
			text: '<b>Department Name: </b>' + metaJSON.filter(a=>a.measureId == rID)[0].departmentName + '<br><b>Measure Name: </b>' + metaJSON.filter(a=>a.measureId == rID)[0].qmsMeasure + '<br><b>Target Info: </b>' + tgtText, 
			font: {size: 14}
		},
		showlegend: true, 
		legend: {orientation: "h", y: -.21},
		height: 300, 				
		xaxis: {showticklabels: true/*, hoverformat: spLineFormatX*/},
		yaxis: {showticklabels:false/*, hoverformat: spLineFormatY*/},
		
		//colorway: ['#7a1c00', '#5c6b73']
	};
	Plotly.newPlot('rolling12rID'+rID, data, layout, {scrollZoom: true, modeBarButtonsToRemove: ['hoverClosestGl2d', 'zoom2d', 'pan2d', 'select2d', 'lasso2d','hoverClosestCartesian', 'hoverCompareCartesian', 'toggleSpikelines'], displaylogo:false});
	
					
}


















