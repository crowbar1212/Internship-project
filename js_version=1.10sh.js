var selectedStep = 0;
var blnRunChangeEvent = true;
let metaJSON = [];
let metricJSON = [];
let analysisJSON = [];
let measureProfileJSON = [];
let metricQcJSON = [];
let calcDescJSON = [];
let windowsNtUserName = '';
let blnChangeForm3 = false;
let blnChangeForm4 = false;
let blnChangeForm5 = false;
let blnChangeForm6 = false;
let minChangeYear = new Date().getFullYear();
let maxAutoId = 0;
let sprocStatus = false
let whoChangedDataJSON = [];
let rolling12SnapshotJSON = [];


//creating a variable with an internal listener event
blnChangeMade = {
  aInternal: false,
  aListener: function(val) {},
  set a(val) {
    this.aInternal = val;
    this.aListener(val);
  },
  get a() {
    return this.aInternal;
  },
  registerListener: function(listener) {
    this.aListener = listener;
  }
}

blnChangeMade.registerListener(function(val) {
  console.log("var 'blnChangeMade.a' showing a value of: " + val);
  if (val = true) {
	//$("#saveIcon").addClass("fa fa-floppy-o saveIcon");  /*original line*/
	$("#saveIcon").addClass("saveIcon");  
  }else if (val = false) {	  
	$("#saveIcon").removeClass("saveIcon");  
  }
  
});




$(document).ready(function() {
	//initially hide the other forms showing only form 1
		showHide(2);
		$("#workingWith").hide();
	
	//Click Event for Step Timeline
		$(".marker").click(function(e) {
			showHide(e.target.id);
		});	
	//Click Event for FAQ Section
		$(".faqLeft, .faqCenter, .faqRight").click(function() {
			faqShowHide(this.className);
		});
	
	//Initially hide all FAQ options
		$("#faqLeft, #faqCenter, #faqRight").hide();
	
	//Click Event for Reports Section
		$("#Report1, #Report2, #Report3, #Report4").click(function() {
			reportShowHide(this.id);
		});
	
	//Initially hide all Reports
		$("#tableReport1, #tableReport2, #tableReport3, #divReport4").hide();
	
	//Click Event for "Step 1" label in Step 2 description
		$("#lblClick").click (function() {
			showHide(1);
		});
	
	getUserName();
	getMetaJSON();
	getCalcOptions();
		
	//Populate Dropdowns		
		//Step 1 Form
			//Department Name
				arr=metaJSON.map(a => a.departmentName);				
				fillListOptions(arr,"newDepartment");
				
		//Step 2 Form
			//departmentName
				arr=metaJSON.map(a => a.departmentName);
				fillSelectOptions(arr,"selDept");
			//SLT_Owner
				arr=metaJSON.map(a => a.measureSltOwner);
				fillSelectOptions(arr,"selSLT");
			//Scorecard_Label
				arr=metaJSON.map(a => a.scorecardLabel);
				fillSelectOptions(arr,"selScorecard");
			//Data Entered By
				arr=metaJSON.map(a => a.dataEnteredBy);
				fillSelectOptions(arr,"selDataEnteredBy");
		
		//Step 3 Form
			//Measure Type
				arr = metaJSON.map(a => a.measureTypeDesc);
				fillSelectOptions(arr,"selMeasureType");
			//Committee Reports To
				//arr = metaJSON.map(a => a.Reported_to);
				//fillListOptions(arr,"reportsTo");
			//Scorecard Label
				arr = metaJSON.map(a => a.scorecardLabel);
				fillListOptions(arr,"scorecardLabel");
			//Data Entered By
				arr = metaJSON.map(a => a.dataEnteredBy);
				fillListOptions(arr,"enteredBy");
			//SLT Member
				arr = metaJSON.map(a => a.measureSltOwner);
				fillListOptions(arr,"SLT");
			//Data Validated By
				arr = metaJSON.map(a => a.validatedBy);
				fillListOptions(arr,"validatedBy");
			//Quality Liaison
				arr = metaJSON.map(a => a.qualityLiaisonDesc);
				fillListOptions(arr,"qualityLiaison");
	
		//Step 4 Form
			//Calculation Method:
				arr = ['','No Calculation - number manually entered', 'Custom Calculation?  Contact Greg Trader', '', 'Numerator / Denominator as % (ie 76%)', '1- (Numerator / Denominator) as % (ie 24%)', 'Numerator / Denominator as rate  per 1,000 (ie 5,940)', 'Numerator / Denominator as rate (ie 5.94)', 'QTR: (Numerator / Denominator)', 'QTR: (Numerator / Denominator) per 1,000 (ie 5,940)', 'QTR: Average of Numerator', 'QTR: Sum of Numerator', 'QTR: Sum of Achievement', 'QTR: Weighted Average (Numerator / Denominator)', 'QTR: Weighted Average (Numerator / Achievement)', 'Rolling 12: (Sum of Numerator) / (Median of Denominator) ', 'Rolling 12: (Sum of Numerator) / (Sum of Denominator) as %', 'Rolling 12: (Sum of Numerator) / (Sum of Denominator) as rate', 'Rolling 12: (Sum of Numerator) / (Sum of Denominator) per 10,000', 'Rolling 12: Sum of Denominator', 'Rolling 12: Sum of Numerator', 'Rolling 12: Median of Numerator', 'Rolling 12: Weighted Average (Numerator / Denominator)', 'YTD: (Sum of Numerator) / (Average of Denominator)', 'YTD: (Sum of Numerator) / (Sum of Denominator)', 'YTD: (Median of Numerator) / (Median of Denominator)', 'YTD: Average of Numerator', 'YTD: Sum of Numerator', 'YTD: Sum of Denominator','Custom: IMM 2-Flu:: Oct-Apr (Sum of Denominator)', 'Custom: IMM 2-Flu:: Oct-Apr (Sum of Num) / (Sum of Denom)'];
				e = document.querySelectorAll('[id$=CalcOptions]');  //get all elements that END in 'CalcOptions'					
				for (i=0;i<e.length;i++) {fillSelectOptions(arr,e[i].id);}
			//Graphing Option:
				arr = ['Column', 'Line'];
				e = document.querySelectorAll('[id$=GraphOptions]');  //get all elements that END in 'GraphOptions'					
				for (i=0;i<e.length;i++) {fillSelectOptions(arr,e[i].id);}
			//Number Format:
				arr = ['Currency','Percent','Number'];		
				e = document.querySelectorAll('[id$=NumberFormat]');  //get all elements that END in 'NumberFormat'					
				for (i=0;i<e.length;i++) {fillSelectOptions(arr,e[i].id);}
			//Number of Decimals:
				arr = [0,1,2,3,4];		
				e = document.querySelectorAll('[id$=NumberOfDecimals]');  //get all elements that END in 'NumberOfDecimals'					
				for (i=0;i<e.length;i++) {fillSelectOptions(arr,e[i].id);}
			//Desired Direction
				arr = ["Up", "Down"];
				fillSelectOptions(arr, "tgtDesiredDirection");
			//Measure KPI
				arr = ["", "Numerator", "Denominator", "Achievement", "Quarterly Summary", "Additional Field One", "Additional Field Two"];				
				fillSelectOptions(arr, "kpiMetric", 'true');

	
		//Change Event for Drop Downs
			$("#selDept").change(function() {										
				arr = metaJSON.filter(a => a.departmentName == this.options[this.selectedIndex].text);
				buildDataTable(arr);
				buildOnClickEvent("Output", 0, 2, 0);				
				
				/*clear out other drop down */				
					selectDropdownShowOnly(this.id);
			});
			
			$("#selSLT").change(function() {										
				arr = metaJSON.filter(a => a.measureSltOwner == this.options[this.selectedIndex].text);
				buildDataTable(arr);
				buildOnClickEvent("Output", 0, 2, 0);
				
				/*clear out other drop down */				
					selectDropdownShowOnly(this.id);
			});
			
			$("#selScorecard").change(function() {										
				arr = metaJSON.filter(a => a.scorecardLabel == this.options[this.selectedIndex].text);
				buildDataTable(arr);
				buildOnClickEvent("Output", 0, 2, 0);
				
				/*clear out other drop down */				
					selectDropdownShowOnly(this.id);
			});
			
			$("#selDataEnteredBy").change(function() {										
				arr = metaJSON.filter(a => a.dataEnteredBy == this.options[this.selectedIndex].text);
				buildDataTable(arr);
				buildOnClickEvent("Output", 0, 2, 0);
				
				/*clear out other drop down */				
					selectDropdownShowOnly(this.id);
			});

		//Change Event for Report Year (Step 5)
			$("#dataYear").change(function() {				
				updateAllMonthlyMetrics(this.value);
			});
		//Change Event for Report Year (of Step 6)
			$("#analysisYear").change(function() {				
				updateAllActions(this.value);
			});
	
	
});

function showHide(i) {						
		selectedStep = i;
		$("form").hide();				
		$("#form" + i).show();
		
		$(".marker").removeClass("active");			
		$("#" + i).addClass("active");
		
		if (i==0 || i==1 || i==7 ) { /*0=?; 1=1 */
			$(".header, .rightBox, .OptionTable").hide();
			}		
		else if (i>=2 && i<=6 ) {
			$(".header, .rightBox, .OptionTable").show();
			qmsChart()  //generate (or refresh) chart
		}
		else {
			$(".header").show();
		}
	};

function faqShowHide(className) {
	["faqLeft", "faqCenter", "faqRight"].forEach(function(clsName) {
		$("#" + clsName).hide();
		$("." + clsName).removeClass("faqActive");
	});
	
	//$("#faqLeft, #faqCenter, #faqRight").hide();	
	$("#" + className).show();
	//$(".marker").removeClass("active");			
	$("." + className).addClass("faqActive");
};

function reportShowHide(idName) {
	["Report1", "Report2", "Report3", "Report4"].forEach(function(nm) {
		$("#table" + nm).hide();
		$("#div" + nm).hide();
		$("#" + nm).removeClass("reportActive");
	});
	
	$("#table" + idName).show();	
	$("#div" + idName).show();	
	$("#" + idName).addClass("reportActive");
};


function fillListOptions(arrList, eName) {
	arrList.push("");  /*Add a blank value so that it is first in the list*/
	uniqueList = [...new Set(arrList)]; /*Dedupe*/	
	uniqueList.sort();	
		
	var list = document.getElementById(eName);
	
	if (list.options.length > 1) {
		for (var i=list.options.length - 1; i >=0; i--) {
			list.remove(i);		/*Remove any pre-existing options first!*/
		}
	}
	
	uniqueList.forEach (function (item) {
		var option = document.createElement('option');
		option.value = item;
		list.appendChild(option);
	});
};


function fillSelectOptions(arrList, eName, doNotSort) {
	arrList.push("");  /*Add a blank value so that it is first in the list*/	
	
	if (arrList.includes('Custom Calculation?  Contact Greg Trader') || doNotSort == 'true') { 
		uniqueList = arrList;
	} else {
		uniqueList = [...new Set(arrList)]; /*Dedupe*/	
		uniqueList.sort();	
	}
			
	var list = document.getElementById(eName);
	
	list.options.length = 0; /*Reset list back to 0*/
	
	for (var i = 0; i < uniqueList.length; i++) {
		list.options[list.options.length] = new Option (uniqueList[i], i);
	};	
};

function selectDropdownShowOnly(eID) {
	var e = document.getElementById("form2");
	for (i = 0; i < e.length; i++) {	
		if (e.elements[i].id !== eID) {
			e.elements[i].selectedIndex = 0;
		};
	};
};



	
function buildDataTable(arr) {					
	var txtTable = "";
	//Remove Existing Rows in Table
		$('#Output > tbody').empty();
	
	//build out table
	for (var i = 0; i < arr.length; i++) {	
		txtTable = txtTable + "<tr id='row1'>";
		txtTable = txtTable + "<td style='width:30%;'>" + arr[i].departmentName + "</td>";		
		txtTable = txtTable + "<td style='display:none; width:10%;'>" + arr[i].measureId + "</td>";		
		txtTable = txtTable + "<td style='width:40%;'>" + arr[i].qmsMeasure + "</td>";		
		txtTable = txtTable + "<td style='width:20%;'>" + arr[i].measureSltOwner + "</td>";
		txtTable = txtTable + "</tr>";
		
	};//End Loop
	
	//Display table
		$('#Output > tbody:last-child').append(txtTable);
	
	//If Table has more than 7 values, display the scroll bar		
		if (arr.length > 6) {
			$(".OptionTable").addClass("DisplayScrollBar");	
		}
		else {
			$(".OptionTable").removeClass("DisplayScrollBar");	
		};
}
	
function buildOnClickEvent (tblName, deptNmColNum, measureNmColNum, defaultStepPos) {	
	var table = document.getElementById(tblName), rIndex;
	
	for (var i = 1; i < table.rows.length; i++) {
		table.rows[i].onclick = function () {														
			a=metaJSON.filter(a=>a.departmentName.trim() == this.cells[deptNmColNum].innerText.trim() && a.qmsMeasure.trim() == this.cells[measureNmColNum].innerText.trim())[0].measureId;
			document.getElementById("headerReportID").innerHTML = a;
			$("#workingWith").show();
			
			populateFieldsFromSelection(a);	
									
			removeSaveIcon();	

			if (defaultStepPos != 0) { showHide(defaultStepPos); }
		}
	}
}

function removeSaveIcon() {
	//change Flag to false
		blnChangeMade.a = false;
			
	//Remove  'Saving QMS Changes' box
		newStr = "saveIcon";
		[newStr + 'Display', newStr + 'DisplayHeader', newStr + 'DisplayMain', newStr + 'DisplayFooter', newStr + 'Button'].forEach(function(clsName) {				
			$("#" + clsName).removeClass(clsName);
			});
	//Remove saveIcon image
		$("#saveIcon").removeClass("saveIcon");  
}
	
function populateFieldsFromSelection(measureId) {	
	blnRunChangeEvent = false;		//Temporarily pause change event 
	
	$(".loader-wrapper").fadeIn("fast");
	arr = metaJSON.filter(a => a.measureId == measureId);
	console.log(JSON.stringify(arr));
	/*Header Section*/
		document.getElementById("headerDepartment").innerHTML = arr[0].departmentName;
		document.getElementById("headerMeasure").innerHTML = arr[0].qmsMeasure;
		document.getElementById("headerSLT").innerHTML = arr[0].measureSltOwner;
		document.getElementById("headerScorecard").innerHTML = arr[0].scorecardLabel;
		document.getElementById("headerReportID").innerHTML = measureId;
	/*Step 3*/
		populateSelectList ("selMeasureType", arr[0].measureTypeDesc);
		//document.getElementById("txtReportsTo").value = arr[0].Reported_to;
		document.getElementById("txtScorecardLabel").value = arr[0].scorecardLabel;
		document.getElementById("txtEnteredBy").value = arr[0].dataEnteredBy;
		document.getElementById("txtSLT").value = arr[0].measureSltOwner;
		document.getElementById("txtValidatedBy").value = arr[0].validatedBy;
		document.getElementById("txtQualityLiaison").value = arr[0].qualityLiaisonDesc;		
		document.getElementById("objective").value = arr[0].Objective;
		document.getElementById("dataCollection").value = arr[0].dataCollectionMethod;
		document.getElementById("inclusion").value = arr[0].inclusionCriteria;
		document.getElementById("exclusion").value = arr[0].exclusionCriteria;
		document.getElementById("dmaicLocation").value = arr[0].dmaicLocation;
	/*Step 4*/
		document.getElementById("numLabel").value = arr[0].numeratorLabel;
		populateSelectList ("numGraphOptions", arr[0].numeratorGraphDesc);
		populateSelectList ("numNumberFormat", arr[0].numeratorFormatDesc);
		populateSelectList ("numNumberOfDecimals", arr[0].numeratorDecimals);
		
		document.getElementById("denomLabel").value = arr[0].denominatorLabel;
		populateSelectList ("denomGraphOptions", arr[0].denominatorGraphDesc);
		populateSelectList ("denomNumberFormat", arr[0].denominatorFormatDesc);
		populateSelectList ("denomNumberOfDecimals", arr[0].denominatorDecimals);
		
		document.getElementById("achLabel").value = arr[0].achievementLabel;
		populateSelectList ("achCalcOptions", arr[0].achievementCalcDesc);	
		populateSelectList ("achGraphOptions", arr[0].achievementGraphDesc);		
		populateSelectList ("achNumberFormat", arr[0].achievementFormatDesc);
		populateSelectList ("achNumberOfDecimals", arr[0].achievementDecimalsDesc);
		
		document.getElementById("tgtLabel").value = arr[0].targetLabel;
		populateSelectList ("tgtGraphOptions", arr[0].targetGraphDesc);		
		populateSelectList ("tgtNumberFormat", arr[0].targetFormatDesc);
		populateSelectList ("tgtNumberOfDecimals", arr[0].targetDecimals);
		
		document.getElementById("qtrLabel").value = arr[0].quarterlySummaryLabel;
		populateSelectList ("qtrCalcOptions", arr[0].quarterlySummaryCalcDesc);	
		populateSelectList ("qtrGraphOptions", arr[0].quarterlySummaryGraphDesc);		
		populateSelectList ("qtrNumberFormat", arr[0].quarterlySummaryFormatDesc);
		populateSelectList ("qtrNumberOfDecimals", arr[0].quarterlySummaryDecimals);
		
		document.getElementById("addLabel").value = arr[0].addFieldOneLabel;
		populateSelectList ("addCalcOptions", arr[0].addFieldOneCalcDesc);	
		populateSelectList ("addGraphOptions", arr[0].addFieldOneGraphDesc);		
		populateSelectList ("addNumberFormat", arr[0].addFieldOneFormatDesc);
		populateSelectList ("addNumberOfDecimals", arr[0].addFieldOneDecimals);
		
		document.getElementById("secAddLabel").value = arr[0].addFieldTwoLabel;
		populateSelectList ("secAddCalcOptions", arr[0].addFieldTwoCalcDesc);	
		populateSelectList ("secAddGraphOptions", arr[0].addFieldTwoGraphDesc);		
		populateSelectList ("secAddNumberFormat", arr[0].addFieldTwoFormatDesc);
		populateSelectList ("secAddNumberOfDecimals", arr[0].addFieldTwoDecimals);
		
		populateSelectList ("tgtDesiredDirection", arr[0].targetDesiredDirection);
		populateSelectList ("kpiMetric", arr[0].measureKpiDesc);
	
		adjustMetricInputFormats();
	
	/*Step 5*/
		document.getElementById("numMetricLabel").innerHTML = arr[0].numeratorLabel;
		document.getElementById("denomMetricLabel").innerHTML = arr[0].denominatorLabel;
		document.getElementById("achMetricLabel").innerHTML = arr[0].achievementLabel;
		document.getElementById("tgtMetricLabel").innerHTML = arr[0].targetLabel;
		document.getElementById("qtrMetricLabel").innerHTML = arr[0].quarterlySummaryLabel;
		document.getElementById("addMetricLabel").innerHTML = arr[0].addFieldOneLabel;
		document.getElementById("secAddMetricLabel").innerHTML = arr[0].addFieldTwoLabel;
		
		//Get Metric Data from raw
		updateAllMonthlyMetrics()
		
	/*Step 6*/
		updateAllActions()
		
	/*Apply Change event to all elements in Form 3 - Form 6*/
		applyChangeEvents();
		
	blnRunChangeEvent = true;		//Enable change event to run again
	$(".loader-wrapper").fadeOut("slow");
};
	
	
	
function populateSelectList (eName, txt) {
		var list = document.getElementById(eName);
		//Modify txt if necessary
			if (txt == "quarterlySummary") {
				txt = "Quarterly Summary";
				} else if (txt == "addFieldOne") {
					txt = "Additional Field One";
				} else if (txt == "addFieldTwo") {
					txt = "Additional Field Two";
				} else if (txt == "Undetermined") {
					txt = "";
				} else if (txt == "Undefined") {
					txt = "";
				}
		//list.selectedIndex = 0; 	//set initial selection to default value		
		for (var i = 0; i < list.options.length; i++) {									
			if (txt == list.options[i].innerHTML) {				
				list.selectedIndex = i;
			} }
	}

function applyChangeEvents() {
	$( $( "#form3" )[0].elements ).each( function () {		
			removeLiveUpdate ( document.getElementById(this.id) );
			setLiveUpdate( document.getElementById(this.id) ); });
			
	$( $( "#form4" )[0].elements ).each( function () {		
			removeLiveUpdate ( document.getElementById(this.id) );
			setLiveUpdate( document.getElementById(this.id) ); });
	
	$( $( "#form5" )[0].elements ).each( function () {		
			removeLiveUpdate ( document.getElementById(this.id) );
			setLiveUpdate( document.getElementById(this.id) ); });
			
	$( $( "#form6" )[0].elements ).each( function () {		
			removeLiveUpdate ( document.getElementById(this.id) );
			setLiveUpdate( document.getElementById(this.id) ); });
	
}

function adjustMetricInputFormats () {
	document.getElementById("form5").reset();
	e = document.querySelectorAll('[id$=NumberFormat]');  //get all elements that END in 'NumberFormat'
		// 0=''; 1=Currency; 2=Number; 3=Percent
		for (i=0;i<e.length;i++) {
			var metric = e[i].id.replace('NumberFormat','');	
			var decimals = document.getElementById(metric + 'NumberOfDecimals').options[document.getElementById(metric + 'NumberOfDecimals').value].text;			
			
			if (e[i].value == 1) {						
				formatStyle = {style:"currency", currency: "USD", minimumFractionDigits: + decimals};
				//loop through months to 1. Iinstall the input filter event     2.set the placeholder value
					for (j=1;j<13;j++) { 			
						removeInputFilter(document.getElementById(metric + j), function(value) {return /^[\-0-9.,]*$/i.test(value);}, formatStyle)			
						setInputFilter(document.getElementById(metric + j), function(value) {return /^[\-0-9.,]*$/i.test(value);}, formatStyle)
						document.getElementById(metric + j).placeholder = "$";
						}  // end j-loop					
			} else if (e[i].value == 0 || e[i].value == 2) {	
				formatStyle = {minimumFractionDigits: + decimals};			
				//loop through months to 1. install the input filter event  2.set the placeholder value
					for (j=1;j<13;j++) { 
						removeInputFilter(document.getElementById(metric + j), function(value) {return /^[\-0-9.,]*$/i.test(value);}, formatStyle)
						setInputFilter(document.getElementById(metric + j), function(value) {return /^[\-0-9.,]*$/i.test(value);}, formatStyle)
						document.getElementById(metric + j).placeholder = "";
						}  // end j-loop			
			} else if (e[i].value == 3) {						
				formatStyle = {style: "percent", minimumFractionDigits: + decimals};
				//loop through months to 1. install the input filter event  2.set the placeholder value
					for (j=1;j<13;j++) { 
						removeInputFilter(document.getElementById(metric + j), function(value) {return /^[\-0-9.,%]*$/i.test(value);}, formatStyle)
						setInputFilter(document.getElementById(metric + j), function(value) {return /^[\-0-9.,%]*$/i.test(value);}, formatStyle)
						document.getElementById(metric + j).placeholder = "%";
						}  // end j-loop
					} //end if-statement
				
			//All Manual Entry (value = 1) change background & readOnly property
				try {					
					if (document.getElementById(metric + 'CalcOptions').value !== 1 && document.getElementById(metric + 'CalcOptions').value !== "1") {												
						for (j=1;j<13;j++) {
							document.getElementById(metric + j).style.color = "rgb(80,80,80)";
							document.getElementById(metric + j).style.background = "rgb(200,200,200)";
							document.getElementById(metric + j).readOnly = true;							
							}
					} else {
						for (j=1;j<13;j++) {
							document.getElementById(metric + j).style.color = "rgb(80,80,80)";
							document.getElementById(metric + j).style.background = "white";
							document.getElementById(metric + j).readOnly = false;							
						}
					}					
				} 
				catch {
					
				} //end try-catch statement
				}//end i-loop
	}//end function
		
	
	//function to restrict the input value for a given textbox & restriction criteria	
	document.getElementById('txtNewMeasure').addEventListener("keyup", newMeasureCheck);
	document.getElementById('createNewMeasureButton').addEventListener("click", callNewMeasure);	
	
	function newMeasureCheck(e) {
		if (this.value !=='') {
			document.getElementById('newMeasureCheck').innerHTML = metaJSON
				.map(function(a) {
					return {'measureName': a.qmsMeasure
							, 'departmentName': a.departmentName};
				})
				.filter(a=>a.measureName !== null)
				.filter(a=>a.measureName.toLowerCase().indexOf(this.value.toLowerCase()) > -1 )
				.map(function(a) {
					return "<p style='font-weight:400;'>" + a.measureName.replace(/&/g, "&amp;").replace(/</g, "&lt;") + " (" + a.departmentName + ")" + "</p>";
					})
				.join("");
				//Add class to div element to show on page
				$("#createNewMeasureButton").addClass("createNewMeasureButton");
		} else {
			document.getElementById('newMeasureCheck').innerHTML = '';
			//remove class to div element to show on page
				$("#createNewMeasureButton").removeClass("createNewMeasureButton");
		}
	};
	
	function callNewMeasure() {
		createNewMeasure();  //make call to jsPHP file
	}
	
	function setInputFilter(textbox, inputFilter, formatOptions) {
		  ["input", "keydown", "keyup", "mousedown", "mouseup", "select", "contextmenu", "drop"].forEach(function(event) {
		  textbox.addEventListener(event, myFilter);
		  textbox.myParam = [inputFilter, formatOptions];
		  })
		  textbox.addEventListener("change", myFormat);
		  };

	function removeInputFilter(textbox, inputFilter, formatOptions) {
		  ["input", "keydown", "keyup", "mousedown", "mouseup", "select", "contextmenu", "drop"].forEach(function(event) {
		  textbox.removeEventListener(event, myFilter);
		  textbox.myParam = [inputFilter, formatOptions];
		  })
		  textbox.removeEventListener("change", myFormat);
		  };
	 
	function myFilter (evt){
		inputFilter = evt.currentTarget.myParam[0];		  //capture the first paramater in array		
			  try {
				firstChar = this.value.charAt(0);
				}
				catch {
					firstChar = null;
				}
			  if (firstChar = "$") {
				this.oldValue = this.value;
				this.value = this.value.replace('$','');
			  }
				
			  if (inputFilter(this.value)) {
				this.oldValue = this.value;
				this.oldSelectionStart = this.selectionStart;
				this.oldSelectionEnd = this.selectionEnd;
			  } else if (this.hasOwnProperty("oldValue")) {
				this.value = this.oldValue;
				this.setSelectionRange(this.oldSelectionStart, this.oldSelectionEnd);
			  } else {
				this.value = "";
			  }		  
		};
		
	function myFormat (evt) {
		var formatter = new Intl.NumberFormat("en-US",evt.currentTarget.myParam[1]);					//set the format paramaters by capturing the 2nd parameter in array
		if(this.value.length >0) {																		//only format if a value exists			
			if (formatter.formatToParts(this.value).map(a => a.type).includes("percentSign")) {			//evaluate formatting style options looking for 'percentSign'
					if (this.value.includes("%")) {this.value = this.value.replace('%','') / 100;}		//if user types in % sign, convert to decimal prior to formatting
					this.value = formatter.format(this.value);
				} else {
					this.value = formatter.format(this.value.replace(/,/g,''));							//must remove comma otherwise format will return NAN - which is bad
				}
			} 
	}

	function setLiveUpdate(textbox){
		textbox.addEventListener("change", captureUpdates);
	}
	function removeLiveUpdate(textbox){
		textbox.removeEventListener("change", captureUpdates);
	}

	function captureUpdates() {		
		if (this.id == 'dataYear' || this.id == 'analysisYear') {return;} 					//early exit from function
		if (blnRunChangeEvent == false) {return;}											//early exit from function.  Value is set to 'false' when loading measure for first time or when values changed by updating the year
		
		//Mapping Arrays
			var arrMetric = ["num", "denom", "ach", "tgt", "qtr", "add", "secAdd", "Label", "GraphOptions", "NumberFormat", "NumberOfDecimals"];
			var arrMetricFull = ["numerator", "denominator", "achievement", "target", "quarterlySummary", "addFieldOne", "addFieldTwo", "metricLabel", "metricGraphDesc", "metricFormatDesc", "metricDecimals"];
			/*HTML Tag name*/ var arrElement = ["numLabel", "numGraphOptions", "numNumberFormat", "numNumberOfDecimals", "denomLabel", "denomGraphOptions", "denomNumberFormat", "denomNumberOfDecimals", "achLabel", "achCalcOptions", "achGraphOptions", "achNumberFormat", "achNumberOfDecimals", "tgtLabel", "tgtGraphOptions", "tgtNumberFormat", "tgtNumberOfDecimals", "qtrLabel", "qtrCalcOptions", "qtrGraphOptions", "qtrNumberFormat", "qtrNumberOfDecimals", "addLabel", "addCalcOptions", "addGraphOptions", "addNumberFormat", "addNumberOfDecimals", "secAddLabel", "secAddCalcOptions", "secAddGraphOptions", "secAddNumberFormat", "secAddNumberOfDecimals", "tgtDesiredDirection", "kpiMetric", "selMeasureType", "txtScorecardLabel", "txtSLT", "txtEnteredBy", "txtValidatedBy", "txtQualityLiaison", "objective", "dataCollection", "inclusion", "exclusion", "dmaicLocation"];
			/*JSON Field name*/ var arrField = ["numeratorLabel", "numeratorGraphDesc", "numeratorFormatDesc", "numeratorDecimals", "denominatorLabel", "denominatorGraphDesc", "denominatorFormatDesc", "denominatorDecimals", "achievementLabel", "achievementCalcDesc", "achievementGraphDesc", "achievementFormatDesc", "achievementDecimals", "targetLabel", "targetGraphDesc", "targetFormatDesc", "targetDecimals", "quarterlySummaryLabel", "quarterlySummaryCalcDesc", "quarterlySummaryGraphDesc", "quarterlySummaryFormatDesc", "quarterlySummaryDecimals", "addFieldOneLabel", "addFieldOneCalcDesc", "addFieldOneGraphDesc", "addFieldOneFormatDesc", "addFieldOneDecimals", "addFieldTwoLabel", "addFieldTwoCalcDesc", "addFieldTwoGraphDesc", "addFieldTwoFormatDesc", "addFieldTwoDecimals", "targetDesiredDirection", "measureKpiDesc", "measureTypeDesc", "scorecardLabel", "measureSltOwner", "dataEnteredBy", "validatedBy", "qualityLiaisonDesc", "Objective", "dataCollectionMethod", "inclusionCriteria", "exclusionCriteria", "dmaicLocation"];
		
		var form = $("#"+this.id).parents().map(function(){return this.id;}).get().join(",").split(",").filter(a => a.indexOf("form") > -1);
		if (this.type == "select-one") {var newValue = this.options[this.selectedIndex].text;} 	//New value
			else {var newValue = this.value;}		
		var rID = document.getElementById("headerReportID").innerHTML;				//Report ID
		
		if (form=="form5") {
			blnChangeForm5 = true;
			var yr = document.getElementById("dataYear").value						//Metric Year			
			var metric = (this.id).match(/[^0-9]/g).join("");							//identify Metric value from element name
			var metricMonth = (this.id).match(/[^a-z A-Z]/g).join("");						//identify month from element name
					
			var metricName = arrMetricFull[arrMetric.indexOf(metric)]  ;   //Get Full Metric Name
		
			objIndex = metricJSON.findIndex(a => a.measureId ==  rID && a.metricType == metricName && a.metricYear == yr && a.metricMonth == metricMonth);  //get position of field in metricJSON
			//if objIndex = -1 then it doesn't exist and it needs to be created in the JSON and create all other metric  Types that don't exist
			if (objIndex = -1) {
				arrMetricFull.slice(0,7).forEach(function (lbl) {
					var arrLength = metricJSON.filter(a => a.measureId ==  rID && a.metricType == lbl && a.metricYear == yr && a.metricMonth == metricMonth).length;
					if (arrLength == 0) {						
						newObj = {"measureId" : parseInt(rID)
							, "metricType" : lbl
							, "metricYear" : parseInt(yr)
							, "metricMonth" : parseInt(metricMonth)
							, "metricOrder": arrMetricFull.indexOf(lbl) + 1
							, "metricDateValue": yr + "-" + metricMonth + "-01"
							, "metricValue": null
							};
						metricJSON.push(newObj);
					} ;
				});
			};
			objIndex = metricJSON.findIndex(a => a.measureId ==  rID && a.metricType == metricName && a.metricYear == yr && a.metricMonth == metricMonth);  //get position of field in metricJSON			
			
			//get value formatted correctly       
				if (newValue.includes("%") == true) {
						newValue = parseFloat(newValue) / 100;
				}else {
					//newValue = newValue.match(/[0-9.]/g).join("");
					 if(newValue.includes("-")) {
						newValue = newValue.match(/[0-9.]/g).join("") * -1;
					} else {
					newValue = newValue.match(/[0-9.]/g).join("");
					}
				}  
			try {metricJSON[objIndex].metricValue = parseFloat(newValue);} catch{}			//update the value in the metricJSON table
			}
		else if (form == "form4") {	
			blnChangeForm4 = true;
				//modify new value if necessary
				if (newValue == "Additional Field One") {
					newValue = "addFieldOne";
				} else if (newValue == "Additional Field Two") {
					newValue = "addFieldTwo";
				}
			var arrPos = arrElement.indexOf(this.id);								//Get position of element from arrElement			
			var objIndex = metaJSON.findIndex(a => a.measureId == rID);				//Get position of Report ID within metaJSON 			
			metaJSON[objIndex][arrField[arrPos]] = newValue;						//Update the value in the metaJSON table
			
			
			if (this.id.toLowerCase().includes('calc')) {
					metaJSON[objIndex][arrField[arrPos].toString().replace('Desc','ForeignKey')] = calcDescJSON.filter(a=>a.calcOptionsDescription == newValue)[0].calcOptionsForeignKey;
				}
				
			if (this.id.toLowerCase().includes('format')) {
					adjustMetricInputFormats();	//rerun function to establish the proper formats
					document.getElementById("dataYear").value = yr;		//reset the year of the report
					document.getElementById("numMetricLabel").innerHTML = metaJSON.filter(a=>a.measureId == rID)[0].numeratorLabel;
					document.getElementById("denomMetricLabel").innerHTML = metaJSON.filter(a=>a.measureId == rID)[0].denominatorLabel;
					document.getElementById("achMetricLabel").innerHTML = metaJSON.filter(a=>a.measureId == rID)[0].achievementLabel;
					document.getElementById("tgtMetricLabel").innerHTML = metaJSON.filter(a=>a.measureId == rID)[0].targetLabel;
					document.getElementById("qtrMetricLabel").innerHTML = metaJSON.filter(a=>a.measureId == rID)[0].quarterlySummaryLabel;
					document.getElementById("addMetricLabel").innerHTML = metaJSON.filter(a=>a.measureId == rID)[0].addFieldOneLabel;
					document.getElementById("secAddMetricLabel").innerHTML = metaJSON.filter(a=>a.measureId == rID)[0].addFieldTwoLabel;
				}			
			
			/*Build out new Reg Ex*/
				var mapObj = {Label:'', Calc:'', GraphOptions:'', NumberFormat:'', NumberOfDecimals:''}				
				var re = new RegExp(Object.keys(mapObj).join("|"),"gi");
			
			metricOrder = arrMetric.indexOf(this.id.replace(re, function (matched){return mapObj[matched];})) + 1;	//Get the Metric Order position (ie 1 = Numerator)
			metricName = arrMetricFull[arrMetric.indexOf(this.id.replace(this.id.replace(re, function (matched){return mapObj[matched];}),''))];		//Get the mapped Metric Field in JSON (ie numLabel converts to Metric_Label)
						
			metricJSON.filter(a=>a.measureId == rID && a.metricOrder == metricOrder).forEach(function(arr) {		//loop through filtered results to change value
				arr[metricName]=newValue;
			});
			}
		else if (form == "form3") {			
			blnChangeForm3 = true;
			var arrPos = arrElement.indexOf(this.id);								//Get position of element from arrElement			
			var objIndex = metaJSON.findIndex(a => a.measureId == rID);				//Get position of Report ID within metaJSON 			
			metaJSON[objIndex][arrField[arrPos]] = newValue;						//Update the value in the metaJSON table

			}
		else if (form == "form6") {			
			var yr = document.getElementById("analysisYear").value						//Analysis Year	
			blnChangeForm6 = true;
			var objIndex = analysisJSON.findIndex(a=>a.reportYear == yr);	//Get position of element from analysisJSON
			//if objIndex = -1 then it doesn't exist and it needs to be created in the JSON and create all other metric  Types that don't exist
			if (objIndex = -1) {
				newObj = {"measureId" : parseInt(rID)
					, "actionQ1" : null
					, "actionQ2" : null
					, "actionQ3" : null
					, "actionQ4" : null
					, "analysisQ1" : null
					, "analysisQ2" : null
					, "analysisQ3" : null
					, "analysisQ4" : null
					, "reportYear" : parseInt(yr)					
					};
				analysisJSON.push(newObj);
			};
			var objIndex = analysisJSON.findIndex(a=>a.reportYear == yr);	//Get position of element from analysisJSON
			var fieldName = this.id;											//Set Id of field being changed to fieldName
			analysisJSON[objIndex][fieldName] = newValue;						//Update the value in the analysisJSON table
			
			}
		
		
		
		
		blnChangeMade.a = true;														// set flag to True 
		if (form == "form5") {
			reCalculation(this, rID, yr, metric, metricMonth, true);						//run calculations & update MetricJSON variable
			
			/*Calculate the minimun year of any Form 5 changes to only update SQL Server with changed years*/
				var changeYear = Math.min.apply(null, [minChangeYear,yr]);			
				minChangeYear = changeYear;
		}
		
		updateAllMonthlyMetrics(yr)													//rerun function to apply appropriate formatting & to repaint input values
		updateAllActions(yr)
		qmsChart()  																//generate (or refresh) chart
		
	}	



	//Function to loop through all Months & all Metrics and update accordingly
	function updateAllMonthlyMetrics (metricYear) {
		blnRunChangeEvent = false; //Temporarily pause change event
				
		if (metricJSON.length == 0) {getMetricJSON();}		//global variable not yet populated.  call getMetricJSON function				
		
		e = document.querySelectorAll('[id$=NumberFormat]');  					//get all elements that END in 'NumberFormat'
		yr = metricYear || new Date().getFullYear();							//Metric Year
		rID = document.getElementById("headerReportID").innerHTML;				//Report ID

			//make sure that new measureId is the same measureId in metricJSON.  If not, refresh metricJSON
			try {
					if (metricJSON[0].measureId != rID) {getMetricJSON();}
				}
			catch {
				generateShellForNewMeasureMetricsTable();
			}
			
		document.getElementById("dataYear").value = yr;		
		
		for (i=0;i<e.length;i++) {    //loop through the Metrics
			var metric = e[i].id.replace('NumberFormat','');
			
			if (metric == "num") {metricName = "numerator";}
				else if (metric == "denom") {metricName = "denominator";}
				else if (metric == "ach") {metricName = "achievement";}
				else if (metric == "tgt") {metricName = "target";}
				else if (metric == "qtr") {metricName = "quarterlySummary";}
				else if (metric == "add") {metricName = "addFieldOne";}
				else if (metric == "secAdd") {metricName = "addFieldTwo";}
			
			// 0=''; 1=Currency; 2=Number; 3=Percent
			var metric = e[i].id.replace('NumberFormat','');
			for (j=1;j<13;j++) { //loop through months 
				val = metricJSON.filter(a => a.measureId == rID && a.metricYear == yr && a.metricMonth == j && a.metricType == metricName);
				
				//try {console.log('ReportID:' + rID + '; Year:' + yr + '; Month:' + j + '; Metric:' + metricName + '; Value: ' + val[0].Metric_Value);}
				//	catch{}
											
				try {document.getElementById(metric + j).value = val[0].metricValue} 
					catch {document.getElementById(metric + j).value = '';}
								
				var event = new Event('change');								//create & fire event to force formatting of historical metrics
				document.getElementById(metric + j).dispatchEvent(event);
				}  // end j-loop					
		} // end i-loop
		qmsChart()  //generate (or refresh) chart
		
		blnRunChangeEvent = true; //Enable change event to run again
	}
	
	
	//Function to update Form 6 - actions & analysis
	function updateAllActions (metricYear) {
		blnRunChangeEvent = false; //Temporarily pause change event		
		if (analysisJSON.length == 0) {getAnalysisJSON();}		//global variable not yet populated.  call getAnalysisJSON function	
		yr = metricYear || new Date().getFullYear();							//Metric Year
		rID = document.getElementById("headerReportID").innerHTML;				//Report ID
		document.getElementById("analysisYear").value = yr;	

			//make sure that new measureId is the same measureId in metricJSON.  If not, refresh metricJSON			
			try {
					if (analysisJSON[0].measureId != rID) {getAnalysisJSON();}
				}
			catch {
				generateShellForNewMeasureActionsTable();
			}
		
		//loop through Q & labels to capture value & populate in Form 6
		["Q1", "Q2", "Q3", "Q4"].forEach(function (lblTime) {
			["analysis", "action"].forEach (function (lblName) {
				try {val = analysisJSON.filter(a=>a.reportYear == yr)[0][lblName + lblTime]}
					catch {val = '';}
				document.getElementById(lblName + lblTime).value = val;
			});
			
		});

		blnRunChangeEvent = true; //Enable change event to run again		
	}
	
	
	
	function reCalculation(e, rID, yr, metric, metricMonth, reCursive) {
		console.log('e:' + e.id + '; rID:' + rID + '; yr:' + yr + '; metric:' + metric + '; metricMonth:' + metricMonth + '; recursive:' + reCursive);
		var arrMetric = ["num", "denom", "ach", "tgt", "qtr", "add", "secAdd"];
		var arrMetricFull = ["numerator", "denominator", "achievement", "target", "quarterlySummary", "addFieldOne", "addFieldTwo"];
		
		//Make sure that all metrics for each month/year exist
		arrMetricFull.forEach(function (lbl) {
			var arrLength = metricJSON.filter(a => a.measureId ==  rID && a.metricType == lbl && a.metricYear == yr && a.metricMonth == metricMonth).length;
			if (arrLength == 0) {						
				newObj = {"measureId" : parseInt(rID)
					, "metricType" : lbl
					, "metricYear" : parseInt(yr)
					, "metricMonth" : parseInt(metricMonth)
					, "metricOrder": arrMetricFull.indexOf(lbl) + 1
					, "metricDateValue": yr + "-" + metricMonth + "-01"
					, "metricValue": null
					};
				metricJSON.push(newObj);
			} ;
		});
		
		//filter metricJSON  to only look at necessary values
			arr=metricJSON.filter(a=>a.measureId == rID && (a.metricOrder == 1 || a.metricOrder == 2 || a.metricOrder == 3)).map(function(a) {
				return {'metricYear': a.metricYear 
						, 'metricMonth': a.metricMonth
					, 'metricOrder':a.metricOrder
					, 'metricValue': a.metricValue};
			}).sort((a,b) => a.metricYear - b.metricYear || a.metricMonth - b.metricMonth);
						console.log(arr);
		["ach", "qtr", "add", "secAdd"].forEach(function(prefix) {
			var reCalElement = document.getElementById(prefix + metricMonth);
											
			var metricName = arrMetricFull[arrMetric.indexOf(prefix)]  ;   //Get Full Metric Name			
			objIndex = metricJSON.findIndex(a => a.measureId ==  rID && a.metricType == metricName && a.metricYear == yr && a.metricMonth == metricMonth);  //get position of field in metricJSON			
			
			var calcOption = metaJSON.filter(a=>a.measureId== rID)[0][metricName+'CalcForeignKey'];
				//console.log(prefix + ' calc: ' + calcOption + ': ' + document.getElementById(prefix + 'CalcOptions').options[calcOption].text);	
			
			//Monthly Calculations								
				if (calcOption >= 3 && calcOption <= 6) {					
					numerator = arr.filter(a=>a.metricYear == yr && a.metricMonth == metricMonth && a.metricOrder == 1)[0].metricValue;
					denominator = arr.filter(a=>a.metricYear == yr && a.metricMonth == metricMonth && a.metricOrder == 2)[0].metricValue;
										
					if ((calcOption == 3 || calcOption == 6)) {										// Numerator / Denominator as % (ie 76%)  ||    Numerator / Denominator as rate (ie 5.94)
						metricJSON[objIndex].metricValue = myCalculation(numerator / denominator);	
					} else if (calcOption == 4) {													// 1- (Numerator / Denominator) as % (ie 24%)
						metricJSON[objIndex].metricValue = myCalculation(1 - (numerator / denominator));
					} else if (calcOption == 5) {													// Numerator / Denominator as rate  per 1,000 (ie 5,940)
						metricJSON[objIndex].metricValue = myCalculation( (numerator / denominator) * 1000);
					}
				}
					
			//QTR Calculations
				if ((calcOption >=7 && calcOption <= 13) || (calcOption == 26) || (calcOption == 29)) {
					var lowerRange = ((Math.ceil(metricMonth / 3)) * 3) - 2;
					var upperRange = (Math.ceil(metricMonth / 3)) * 3;
					console.log(lowerRange + '::' + upperRange);					
					var newArr = arr.filter(a=>a.metricYear == yr && a.metricMonth >= lowerRange && a.metricMonth <= upperRange);
					var arrNum = newArr.filter(a=>a.metricOrder == 1).map(a=>a.metricValue);
					var arrDenom = newArr.filter(a=>a.metricOrder == 2).map(a=>a.metricValue);
					var arrAch = newArr.filter(a=>a.metricOrder == 3).map(a=>a.metricValue);
					var numerator = arrNum.reduce((total, amount) => total + amount) ;
					var denominator = arrDenom.reduce((total, amount) => total + amount) ;
					var achievement = arrAch.reduce((total, amount) => total + amount) ;
					var numeratorAverage = numerator / arrNum.filter(function(val){ return val!==undefined && val!==null; }).length;
					
					if (calcOption == 7) {								// QTR: (Numerator / Denominator)			
						metricJSON[objIndex].metricValue = myCalculation(numerator / denominator);
					} else if (calcOption == 8 ) {						// QTR: (Numerator / Denominator) per 1,000 (ie 5,940)
						metricJSON[objIndex].metricValue = myCalculation(1 - (numerator / denominator) * 1000);
					} else if (calcOption == 9) {											// QTR: Average of Numerator
						metricJSON[objIndex].metricValue = myCalculation(numeratorAverage);
					} else if (calcOption == 29) {											// QTR: Sum of N Achievement
						metricJSON[objIndex].metricValue = myCalculation(achievement);
					} else if (calcOption == 11) {											// QTR: Sum of Numerator
						metricJSON[objIndex].metricValue = myCalculation(numerator);
					} else if (calcOption == 12 ) {						// QTR: Weighted Average (Numerator / Denominator)
						metricJSON[objIndex].metricValue = myCalculation(myWghtAvg(arrNum, arrDenom.map(a=>a / denominator)));
					} else if (calcOption == 26 ) {						// QTR: Weighted Average (Numerator / Achievement)
						metricJSON[objIndex].metricValue = myCalculation(myWghtAvg(arrNum, arrAch.map(a=>a / achievement)));
					}
					
				}
			//Rolling 12 Calculations
				if ((calcOption >=14 && calcOption <= 20) || (calcOption == 25)) {
					var monthPos=arr.filter(a=>a.metricOrder == 1).findIndex(a=>a.metricYear == yr && a.metricMonth == metricMonth);
					if (monthPos >= 11) {var lowerRange = monthPos-11} else {var lowerRange = 0};
					var upperRange = monthPos+1;
					var newArr = arr.filter(a=>a.metricOrder == 1).slice(lowerRange, upperRange);
					var arrNum = arr.filter(a=>a.metricOrder == 1).slice(lowerRange, upperRange).map(a=>a.metricValue);
					var arrDenom = arr.filter(a=>a.metricOrder == 2).slice(lowerRange, upperRange).map(a=>a.metricValue);

					var numerator = arrNum.reduce((total, amount) => total + amount) ;
					var denominator = arrDenom.reduce((total, amount) => total + amount) ;
					var numeratorAverage = numerator / arrNum.filter(function(val){ return val!==undefined && val!==null; }).length;
					
					if (calcOption == 14) {										//   Rolling 12: (Sum of Numerator) / (Median of Denominator) 
						metricJSON[objIndex].metricValue = myCalculation(numerator / myMedian(arrDenom));
					} else if (calcOption == 15 ) {								//   Rolling 12: (Sum of Numerator) / (Sum of Denominator) as %
						metricJSON[objIndex].metricValue = myCalculation(numerator / denominator);
					} else if (calcOption == 16 ) {								//   Rolling 12: (Sum of Numerator) / (Sum of Denominator) as rate
						metricJSON[objIndex].metricValue = myCalculation(numerator / denominator);
					} else if (calcOption == 17 ) {								//   Rolling 12: (Sum of Numerator) / (Sum of Denominator) per 10,000
						metricJSON[objIndex].metricValue = myCalculation( (numerator / denominator) * 10000);
					} else if (calcOption == 18) {													//   Rolling 12: Sum of Denominator
						metricJSON[objIndex].metricValue = myCalculation(denominator);
					} else if (calcOption == 19)  {													//   Rolling 12: Sum of Numerator
						metricJSON[objIndex].metricValue = myCalculation(numerator);
					} else if (calcOption == 20 ) {								//   Rolling 12: Weighted Average (Numerator / Denominator)
						metricJSON[objIndex].metricValue = myCalculation(myWghtAvg(arrNum, arrDenom.map(a=>a / denominator)));
					} else if (calcOption == 25 ) {								//   Rolling 12: Median of Numerator
						metricJSON[objIndex].metricValue = myCalculation(myMedian(arrNum));
					} 
					
				}
				
			//YTD Calculations
				if ((calcOption >=21 && calcOption <= 24) || calcOption == 30 || calcOption ==31) {
					var lowerRange = arr.filter(a=>a.metricOrder == 1).findIndex(a=>a.metricYear == yr && a.metricMonth == 1);
					var upperRange = arr.filter(a=>a.metricOrder == 1).findIndex(a=>a.metricYear == yr && a.metricMonth == metricMonth)+1;
					var newArr = arr.filter(a=>a.metricOrder == 1).slice(lowerRange, upperRange);
					var arrNum = arr.filter(a=>a.metricOrder == 1).slice(lowerRange, upperRange).map(a=>a.metricValue);
					var arrDenom = arr.filter(a=>a.metricOrder == 2).slice(lowerRange, upperRange).map(a=>a.metricValue);

					var numerator = arrNum.reduce((total, amount) => total + amount) ;
					var denominator = arrDenom.reduce((total, amount) => total + amount) ;
					var numeratorAverage = numerator / arrNum.filter(function(val){ return val!==undefined && val!==null; }).length;
					var denominatorAverage = denominator / arrDenom.filter(function(val){ return val!==undefined && val!==null; }).length;
					
					if (calcOption == 21 ) {										//    YTD: (Sum of Numerator) / (Average of Denominator)
						metricJSON[objIndex].metricValue = myCalculation(numerator / denominatorAverage);
					} else if (calcOption == 22 ) {								//    YTD: (Sum of Numerator) / (Sum of Denominator)
						metricJSON[objIndex].metricValue = myCalculation(numerator / denominator);
					} else if (calcOption == 23) {													//    YTD: Average of Numerator
						metricJSON[objIndex].metricValue = myCalculation(numeratorAverage);
					} else if (calcOption == 24) {													//    YTD: Sum of Numerator
						metricJSON[objIndex].metricValue = myCalculation(numerator);
					} else if (calcOption == 30) {													//    YTD: (Median of Numerator) / (Median of Denominator)
						metricJSON[objIndex].metricValue = myCalculation(myMedian(arrNum) / myMedian(arrDenom));
					} else if (calcOption == 31) {													//    YTD: Sum of Denominator
						metricJSON[objIndex].metricValue = myCalculation(denominator);
					}
					
				}
				
			//Custom Calculations
				if (calcOption == 27) { //IMM 2 - flu:: Oct - April (Sum of Num) / (Sum of Denom)
					if (metricMonth >=5 && metricMonth <=9) {return} //exit as these months don't count
					if (metricMonth >= 10) {						
						var lowerRange = arr.filter(a=>a.metricOrder == 1).findIndex(a=>a.metricYear == yr && a.metricMonth == 10);
						var upperRange = arr.filter(a=>a.metricOrder == 1).findIndex(a=>a.metricYear == yr && a.metricMonth == metricMonth)+1;
						}
					if (metricMonth <= 4) {
						var lowerRange = arr.filter(a=>a.metricOrder == 1).findIndex(a=>a.metricYear == parseInt(yr)-1 && a.metricMonth == 10);
						var upperRange = arr.filter(a=>a.metricOrder == 1).findIndex(a=>a.metricYear == yr && a.metricMonth == metricMonth)+1;						
						}					
					
					var arrNum = arr.filter(a=>a.metricOrder == 1).slice(lowerRange, upperRange).map(a=>a.metricValue);
					var arrDenom = arr.filter(a=>a.metricOrder == 2).slice(lowerRange, upperRange).map(a=>a.metricValue);
					
					var numerator = arrNum.reduce((total, amount) => total + amount) ;
					var denominator = arrDenom.reduce((total, amount) => total + amount) ;
					
					metricJSON[objIndex].metricValue = myCalculation(numerator / denominator);
				}
				
				if (calcOption == 28) { //IMM 2 - flu:: Oct - April (Sum of Denominator)
					if (metricMonth >=5 && metricMonth <=9) {return} //exit as these months don't count
					if (metricMonth >= 10) {						
						var lowerRange = arr.filter(a=>a.metricOrder == 1).findIndex(a=>a.metricYear == yr && a.metricMonth == 10);
						var upperRange = arr.filter(a=>a.metricOrder == 1).findIndex(a=>a.metricYear == yr && a.metricMonth == metricMonth)+1;
						}
					if (metricMonth <= 4) {
						var lowerRange = arr.filter(a=>a.metricOrder == 1).findIndex(a=>a.metricYear == parseInt(yr)-1 && a.metricMonth == 10);
						var upperRange = arr.filter(a=>a.metricOrder == 1).findIndex(a=>a.metricYear == yr && a.metricMonth == metricMonth)+1;						
						}					
					
					var arrNum = arr.filter(a=>a.metricOrder == 1).slice(lowerRange, upperRange).map(a=>a.metricValue);
					var arrDenom = arr.filter(a=>a.metricOrder == 2).slice(lowerRange, upperRange).map(a=>a.metricValue);
					
					var numerator = arrNum.reduce((total, amount) => total + amount) ;
					var denominator = arrDenom.reduce((total, amount) => total + amount) ;
					
					metricJSON[objIndex].metricValue = myCalculation(denominator);
				}
				
		});  //end the for loop section
				
				
				
		if (reCursive == true) {			
			var qLowerRange = ((Math.ceil(metricMonth / 3)) * 3) - 2; 				//lower range of the corresponding quarter
			var curYr = yr;
			var curMth = Math.min.apply(null, [qLowerRange,metricMonth]);			//establish starting point.  Either current month, or beginning of the quarter
			var maxYear = Math.max.apply(null,metricJSON.filter(a => a.measureId == rID ).map(a=>a.metricYear));
			
			for (var ii=curYr; ii<=maxYear; ii++) {
				for (var jj=curMth; jj<=12; jj++) {
					console.log ('Current Year: ' + ii + '; Current Month: ' + jj);
					reCalculation(e, rID, ii, metric, jj, false);					
				}
				curMth = 1;
			}
		}
		
	};
	
	
	function myWghtAvg(a,b) {
		ttl=0;
		for (var i=0;i<a.length;i++){
			ttl = ttl + (a[i] * b[i]);
			}
		return ttl;
	};
	function myMedian(values){
	  values = values.filter(function (val) {
    	return val !== undefined && val !== null;
		})
		
	  if(values.length ===0) return 0;

	  values.sort(function(a,b){
		return a-b;
	  });

	  var half = Math.floor(values.length / 2);

	  if (values.length % 2)
		return values[half];

	  return (values[half - 1] + values[half]) / 2.0;
	};
	
	
	function myCalculation(val) {		
		if (isNaN(val)) {return null;}
		else if (isFinite(val)) {return val;}
		else {return null;}
	};
	
	
	
	
	
	
	
	function qmsChart() {
		var rID = document.getElementById("headerReportID").innerHTML;								//Report ID
		var i = 1;
		
		if (rID == '') {return} //early exit from function
		
		//Variable Set up of chart size based on class setting (ie largeChartSize or rightBox)
		if (document.getElementById("chart").className.includes("rightBox")) {
			sparklineWidth = 1100; sparklineHeight = 250; standardWidth = 1000; standardHeight = 500;
		} else {
			sparklineWidth = 2000; sparklineHeight = 400; standardWidth = 1900; standardHeight = 700;
		}
		
		//Variable set based on the selected Step		
		kpiString = metaJSON.filter(a=>a.measureId == rID)[0].measureKpiDesc || "addFieldOne"; 	//kpiString comes from meta table.  If null, default with "addFieldOne"
		
		if (selectedStep == 2) {seriesArr = ["target", kpiString.charAt(0).toLowerCase() + kpiString.slice(1).replace(' ','')];}
			else {seriesArr = ["numerator", "denominator", "achievement", "target", "quarterlySummary", "addFieldOne", "addFieldTwo"];}
						
		seriesArr.forEach(function(sLabel) {
			//Variable definitions to determine if Series goes on primary or secondary axis & if Series is a Column or a Line
				if (metaJSON.filter(a => a.measureId == rID)[0][sLabel + "GraphDesc"] == "Line") {
					var sType = 'scatter'; var yAxisValue = 'y2';				
				} else {
					var sType = 'bar'; var yAxisValue = 'y';				
				};			
			//Variable defintion to determine if the line is visible or not
				if (metaJSON.filter(a => a.measureId == rID)[0][sLabel + "Label"] == null) {var sVisible = false;} else {var sVisible = true;}			
	
			window['trace' + i] = {
				x: metricJSON.filter(a=>a.metricType==sLabel && a.measureId == rID).sort((a,b) => a.metricYear - b.metricYear || a.metricMonth - b.metricMonth).map(a=>a.metricDateValue.substring(2)),
				y: metricJSON.filter(a=>a.metricType==sLabel && a.measureId == rID).sort((a,b) => a.metricYear - b.metricYear || a.metricMonth - b.metricMonth).map(a=>a.metricValue),
				type: sType, line: {width:4},
				name: metaJSON.filter(a=>a.measureId == rID)[0][sLabel + "Label"],
				xaxis: 'x', 
				yaxis: yAxisValue,
				visible: sVisible
			};
			i++;
		});
		
		//Variable definition to determin format of axis
			sFormatY = ','; sFormatY2 = ','; spLineFormatX = '%{x:.2f}';
		if (metricJSON.filter(a => a.measureId == rID && a.metricGraphDesc == "Column").map(a=>a.metricFormatDesc).includes("Currency")) {var sFormatY = '$,'; var spLineFormatX = '%{x:$.2f}'}
			else if (metricJSON.filter(a => a.measureId == rID && a.metricGraphDesc == "Column").map(a=>a.metricFormatDesc).includes("Percent")) {var sFormatY = ',%'; var spLineFormatX = '%%{x:.2f}'}
			else if (metricJSON.filter(a => a.measureId == rID && a.metricGraphDesc == "Column").map(a=>a.metricFormatDesc).includes("Number")) {var sFormatY = ','; var spLineFormatX = '%{x:.2f}'}
		if (metricJSON.filter(a => a.measureId == rID && a.metricGraphDesc == "Line").map(a=>a.metricFormatDesc).includes("Currency")) {var sFormatY2 = '$,'; var spLineFormatX = '%{x:$.2f}'}
			else if (metricJSON.filter(a => a.measureId == rID && a.metricGraphDesc == "Line").map(a=>a.metricFormatDesc).includes("Percent")) {var sFormatY2 = ',%'; var spLineFormatX = '%%{x:.2f}'}
			else if (metricJSON.filter(a => a.measureId == rID && a.metricGraphDesc == "Line").map(a=>a.metricFormatDesc).includes("Number")) {var sFormatY2 = ','; var spLineFormatX = '%{x:.2f}'}
		spLineFormatY = spLineFormatX.replace('x','y');
		
		
		
		if (selectedStep == 2) {
			var formatDecimals = metaJSON.filter(a=>a.measureId == rID)[0].targetDecimals;
			var formatType = metaJSON.filter(a=>a.measureId == rID)[0].targetFormatDesc;
			
			//if format is Percent - multiple value by 100
				if (formatType == "Percent") {
					var yValKPI = metricJSON.filter(a=>a.metricType == seriesArr[1] && a.measureId == rID).sort((a,b) => a.metricYear - b.metricYear || a.metricMonth - b.metricMonth).map(a => a.metricValue * 100);
					var yValTgt = metricJSON.filter(a=>a.metricType == seriesArr[0] && a.measureId == rID).sort((a,b) => a.metricYear - b.metricYear || a.metricMonth - b.metricMonth).map(a => a.metricValue * 100);
				} else {
					var yValKPI = metricJSON.filter(a=>a.metricType == seriesArr[1] && a.measureId == rID).sort((a,b) => a.metricYear - b.metricYear || a.metricMonth - b.metricMonth).map(a => a.metricValue);
					var yValTgt = metricJSON.filter(a=>a.metricType == seriesArr[0] && a.measureId == rID).sort((a,b) => a.metricYear - b.metricYear || a.metricMonth - b.metricMonth).map(a => a.metricValue);
				}
			
			//Get KPI min & max values
				var yMinKpi = Math.min.apply(null, yValKPI);
				var yMaxKpi = Math.max.apply(null, yValKPI);
			
				if (metaJSON.filter(a=>a.measureId == rID)[0].targetDesiredDirection == "Down") {
					var yBoundry = Array.apply(null, Array(yValKPI.length)).map( () => yMaxKpi);
				} else {
					var yBoundry = Array.apply(null, Array(yValKPI.length)).map( () => yMinKpi);
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
			
			//Create Trace variables
				trace1 = {
					x: metricJSON.filter(a=>a.metricType==seriesArr[0] && a.measureId == rID && a.metricYear <= new Date().getFullYear()).sort((a,b) => a.metricYear - b.metricYear || a.metricMonth - b.metricMonth).map(a=>a.metricDateValue.substring(2))
				  , y: yValTgt
				  , type: 'scatter'
				  , line: { color: '#7a1c00', width: 4  }
				  , name: 'Target: ' + metaJSON.filter(a=>a.measureId == rID)[0][seriesArr[0] + "Label"]
				  , fill: 'tonexty', fillcolor: 'rgba(162, 28, 0, .2)'
				  , hovertemplate: formatA
				};
				trace2 = {
					x: metricJSON.filter(a=>a.metricType==seriesArr[1] && a.measureId == rID && a.metricYear <= new Date().getFullYear()).sort((a,b) => a.metricYear - b.metricYear || a.metricMonth - b.metricMonth).map(a=>a.metricDateValue.substring(2))
				  , y: yValKPI
				  , type: 'scatter'
				  , line: { color: '#5c6b73', width: 4  }
				  , name: 'KPI: ' + metaJSON.filter(a=>a.measureId == rID)[0][seriesArr[1] + "Label"]
				  , hovertemplate: formatB
				};
				trace3 = {
					x: metricJSON.filter(a=>a.metricType==seriesArr[0] && a.measureId == rID && a.metricYear <= new Date().getFullYear()).sort((a,b) => a.metricYear - b.metricYear || a.metricMonth - b.metricMonth).map(a=>a.metricDateValue.substring(2))
				  , y: yBoundry  
				  , type: 'scatter'
				  , name: 'Outside Target'
				  , showlegend: false
				  , line: { color: 'rgba(122, 28 , 0, .01)'  }
				  , hoverinfo: 'skip'
				};
				var data  = [trace3, trace1, trace2];
			
			
			//Define Chart Layout
				var layout = {	
					title: metaJSON.filter(a=>a.measureId == rID)[0].qmsMeasure,				
					showlegend: true, 
					legend: {orientation: "h", y: -.11},
					width: sparklineWidth, height: sparklineHeight,								
					xaxis: {showticklabels: false},
					yaxis: {showticklabels: false},

				};
			
			
		} else if (selectedStep >=3 && selectedStep <=6) {
			var data = [trace1, trace2, trace3, trace4, trace5, trace6, trace7];
			var layout = {
				title: metaJSON.filter(a=>a.measureId == rID)[0].qmsMeasure,
				showlegend: true, 
				legend: {orientation: "h", y: -.11},
				width: standardWidth, height: standardHeight,				
				xaxis:{title: ''},
				yaxis: {
					title: '' 
					, tickformat: sFormatY},
				yaxis2 : {
					title: ''
					, overlaying: 'y'
					, side: 'right'
					, tickformat: sFormatY2
					, showgrid:false
					, zeroline:false
				},
				colorway: ['#5c6b73','#e7bb73','#765f50','#7a1c00','#acc3a6','#1d3557','#fdc3dd']
				
			};
			}
		
		Plotly.newPlot('chart', data, layout, {scrollZoom: true, modeBarButtonsToRemove: ['hoverClosestGl2d', 'zoom2d', 'pan2d', 'select2d', 'lasso2d','hoverClosestCartesian', 'hoverCompareCartesian', 'toggleSpikelines'], displaylogo:false});
		
		//add scroll bar if zoom level > 100%
		if (Math.round(window.devicePixelRatio * 100) >= 90) {
			$(".rightBox").addClass("qmsChartScroll");				
		}
		else {
			$(".rightBox").removeClass("qmsChartScroll");	
		};
		
		//add info Icon to chart element
		$("#chartInfo").addClass("chartInfo");				
		$("#chartResize").addClass("chartResize");	
	}
	
	
	
//Event Listener for info icon button
document.getElementById("chartInfo").addEventListener("click", infoButtonShow);
document.getElementById("chartResize").addEventListener("click", chartResizeToggle);
document.getElementById("chartInfoDisplayFooter").addEventListener("click", infoButtonHide);
document.getElementById("saveIcon").addEventListener("click", infoButtonShow);
document.getElementById("saveIconDisplayFooter").addEventListener("click", infoButtonHide);
document.getElementById("saveIconButton").addEventListener("click", savingData);

function chartResizeToggle() {
	if (document.getElementById("chart").className == "rightBox js-plotly-plot") {
		document.getElementById("chart").className = "largeChartSize js-plotly-plot"
	} else {
		document.getElementById("chart").className = "rightBox js-plotly-plot"
	}
	qmsChart(); //re-generate chart to properly size chart based on newly assigned class
}

function infoButtonShow(){			
	[this.id + 'Display', this.id + 'DisplayHeader', this.id + 'DisplayMain', this.id + 'DisplayFooter', this.id + 'Button'].forEach(function(clsName) {				
			try{$("#" + clsName).addClass(clsName);} catch{}
});
}
function infoButtonHide(){		
	newStr = this.id.replace("DisplayFooter","");
	[newStr + 'Display', newStr + 'DisplayHeader', newStr + 'DisplayMain', newStr + 'DisplayFooter', newStr + 'Button'].forEach(function(clsName) {				
			try{$("#" + clsName).removeClass(clsName);} catch{}
});
}
	
function savingData() {
	$(".loader-wrapper").fadeIn("fast");
	
	if (blnChangeForm3 == true || blnChangeForm4 == true) {
		saveMeasure();  //make call to jsPHP file
		//reset variables
			blnChangeForm3 = false;
			blnChangeForm4 = false;
	
	} 
	if (blnChangeForm5 == true) {
		saveMetrics();  //make call to jsPHP file
		//reset variables
			blnChangeForm5 = false;
			
	} 
	if (blnChangeForm6 == true) {
		saveAnalysis();  //make call to jsPHP file
		//reset variables
			blnChangeForm6 = false;
	}
	
	//change Flag to false
		blnChangeMade.a = false;
	
	//Remove  'Saving QMS Changes' box
		newStr = "saveIcon";
		[newStr + 'Display', newStr + 'DisplayHeader', newStr + 'DisplayMain', newStr + 'DisplayFooter', newStr + 'Button'].forEach(function(clsName) {				
			$("#" + clsName).removeClass(clsName);
			});
	//Remove saveIcon image
		$("#saveIcon").removeClass("saveIcon");  
		
	$(".loader-wrapper").fadeOut("slow");
}

dragElement(document.getElementById("chartInfoDisplay"));

function dragElement(elmnt) {
  var pos1 = 0, pos2 = 0, pos3 = 0, pos4 = 0;
  if (document.getElementById(elmnt.id + "Display")) {
    /* if present, the header is where you move the DIV from:*/
    document.getElementById(elmnt.id + "Display").onmousedown = dragMouseDown;
  } else {
    /* otherwise, move the DIV from anywhere inside the DIV:*/
    elmnt.onmousedown = dragMouseDown;
  }

  function dragMouseDown(e) {
    e = e || window.event;
    e.preventDefault();
    // get the mouse cursor position at startup:
    pos3 = e.clientX;
    pos4 = e.clientY;
    document.onmouseup = closeDragElement;
    // call a function whenever the cursor moves:
    document.onmousemove = elementDrag;
  }

  function elementDrag(e) {
    e = e || window.event;
    e.preventDefault();
    // calculate the new cursor position:
    pos1 = pos3 - e.clientX;
    pos2 = pos4 - e.clientY;
    pos3 = e.clientX;
    pos4 = e.clientY;
    // set the element's new position:
    elmnt.style.top = (elmnt.offsetTop - pos2) + "px";
    elmnt.style.left = (elmnt.offsetLeft - pos1) + "px";
  }

  function closeDragElement() {
    /* stop moving when mouse button is released:*/
    document.onmouseup = null;
    document.onmousemove = null;
  }
}


////////////////////////////	Reports	//////////////////
document.getElementById("Report1").onclick = buildSltMeasureProfileLocal;
function buildSltMeasureProfileLocal () {buildSltMeasureProfile()}  //call to JavaScript/jsReports_v?.js

document.getElementById("Report2").onclick = buildScorecardMeasuresTableLocal;
function buildScorecardMeasuresTableLocal () {buildScorecardMeasuresTable()}   //call to JavaScript/jsReports_v?.js

document.getElementById("Report3").onclick = buildWhoUpdatedDataTableLocal;
function buildWhoUpdatedDataTableLocal () {buildWhoUpdatedDataTable()}   //call to JavaScript/jsReports_v?.js

document.getElementById("Report4").onclick = buildRolling12SnapshotReportLocal;
function buildRolling12SnapshotReportLocal () {buildRolling12SnapshotReport()}   //call to JavaScript/jsReports_v?.js	
	
	