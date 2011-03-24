(function() { 
	    var Dom = YAHOO.util.Dom, 
	        Event = YAHOO.util.Event; 
	 
	    Event.onDOMReady(function() { 
		
			// Look for all the forms in the document
			var docForms = YAHOO.util.Dom.getElementsByClassName('mform');
			
			// Callback function. Activate the tab where the first error fired by QF is displayed
			var fShowErrorTab = function(){
				var j = 0;
				for(var f in docForms){
					var qfErrors = YAHOO.util.Dom.getElementsByClassName('error','span',docForms[f]);
					if(qfErrors.length > 0){
							var fs = YAHOO.util.Dom.getAncestorByTagName(qfErrors[0],'fieldset');
							for(var tI in tabsCache[j]){
								if (tabsCache[j][tI] == fs.id){
									tabView[j].set('activeIndex',tI);
									break;
								}
							}
					}
					j++;
				}
				
			}
            
            // Preseving html editor
            var textAreaEls = YAHOO.util.Dom.getElementsByClassName('form-textarea', null, docForms[f]);
            var htmlEditor = YAHOO.util.Dom.getElementsByClassName('htmlarea','div',docForms[f]);
            for(var e in htmlEditor){                
                htmlEditor[e].parentNode.removeChild(htmlEditor[e]);                
            }           
			
			// This is for preserving the hide and show labels input properties
			// When the DOM is updated, this properties are missing
			var inputA = YAHOO.util.Dom.getElementsBy(function(el){ return el.name == 'mform_showadvanced'}, 'input', docForms[f]);
			var hideLabel, showLabel = '';
			
			if(inputA.length > 0){
				showLabel = inputA[0].moodle.showLabel;
				hideLabel = inputA[0].moodle.hideLabel;
			}
				

			var tabView = [];
			var tabsCache = [];
			var title = '';
			var selected = false;
			var i = 0;

			for(var f in docForms){
				var tabsIndex = [];
				var iHTML = docForms[f].innerHTML;
				var tabsList = '<div class="tabtree"><ul id="tablist'+i+'" class="yui-nav"> ';
				var fieldSets = YAHOO.util.Dom.getElementsByClassName('clearfix','fieldset',docForms[f]);
				
				if(fieldSets.length > 0){
				
					selected = true;
					for(var fs in fieldSets){
						var className = (selected)? ' class="selected"': '';
                        var classType = (fs == 0)? 'class="first"' : '';
                        classType = (fs == fieldSets.length - 1)? 'class="last"' : '';
                        
						selected = false;
						title = YAHOO.util.Dom.getFirstChild(fieldSets[fs]).innerHTML;
                        
                        if(title.indexOf('helplink') > -1){
                            if(title.indexOf('<span') > -1)
                                title = title.substring(0, title.indexOf('<span'));
                            else if(title.indexOf('<SPAN') > -1){
                                title = title.substring(0, title.indexOf('<SPAN'));
                            }
                        }
                        
						tabsList += '<li'+className+' '+classType+'><a href="#'+fieldSets[fs].id+'"><span><em>'+title+'</em></span></a></li>';
						tabsIndex.push(fieldSets[fs].id);
					}
					tabsList += '</ul></div>';
										
					// Only the first item is replaced
					//Not work for IEiHTML = iHTML.replace('<fieldset','<div class="yui-content"><fieldset');
                    var fieldsetFirst = iHTML.indexOf('<fieldset');                    
                    
                    if(fieldsetFirst == -1)
                        fieldsetFirst = iHTML.indexOf('<FIELDSET');                    
                    
                    var newNode = '<div class="yui-content">';
                    iHTML = iHTML.substring(0, fieldsetFirst) + newNode + iHTML.substring(fieldsetFirst);                    
                                                            
					docForms[f].innerHTML = '<div class="yui-skin-sam"><div id="configtabs'+i+'" class="yui-navset">'+tabsList+iHTML+'</div></div></div>';
					

					// Replacement for Show/Hide advanced buttons
					var inputA = YAHOO.util.Dom.getElementsBy(function(el){ return el.name == 'mform_showadvanced'}, 'input', docForms[f]);
					for(var iEl in inputA){
						YAHOO.util.Event.removeListener(inputA[iEl], 'click');
						YAHOO.util.Event.addListener(inputA[iEl], 'click', function(e){
							var button = e.target ? e.target : e.srcElement;
							
							var toSet = YAHOO.util.Dom.getElementsByClassName('advanced',null,docForms[f]);
							var buttontext = '';
							if (button.form.elements['mform_showadvanced_last'].value == '0' ||  button.form.elements['mform_showadvanced_last'].value == '' ) {
								elementShowAdvanced(toSet, true);
								buttontext = hideLabel;
								button.form.elements['mform_showadvanced_last'].value = '1';
							} else {
								elementShowAdvanced(toSet, false);
								buttontext = showLabel;
								button.form.elements['mform_showadvanced_last'].value = '0';
							}
							var formelements = button.form.elements;
							// Fixed MDL-10506
							for (var i = 0; i < formelements.length; i++) {
								if (formelements[i] && formelements[i].name && (formelements[i].name=='mform_showadvanced')) {
									formelements[i].value = buttontext;
								}
							}
							//never submit the form if js is enabled.
							return false;
						});
					}					
					
					
					tabsCache[i] = tabsIndex;
					tabView[i] = new YAHOO.widget.TabView('configtabs'+i);
					
					// Apply Moodle Styles
					YAHOO.util.Dom.replaceClass(YAHOO.util.Dom.get('tablist'+i),'yui-nav','tabrow0');
					
					// Add listener to submit buttoms
					var inputB = YAHOO.util.Dom.getElementsBy(function(el){ return el.type == 'submit'}, 'input', docForms[f]);
					for(var iEl in inputB){
						YAHOO.util.Event.addListener(inputB[iEl], "click", fShowErrorTab);
					}
					
				}
                
                // Restoring html editor
                var editors = [];                
                
                if(! YAHOO.env.ua.ie){
                    for(var i in textAreaEls){      
                        
                        if(YAHOO.util.Dom.getStyle(textAreaEls[i],'display') != 'none')
                            continue;
                            
                        editors[i] = new HTMLArea(textAreaEls[i].id);
                        var config = editors[i].config;
                        config.pageStyle = "body { background-color: #ffffff; font-family: Trebuchet MS,Verdana,Arial,Helvetica,sans-serif; }";
                        config.killWordOnPaste = true;
                        config.fontname = {
                        "Trebuchet":	'Trebuchet MS,Verdana,Arial,Helvetica,sans-serif',
                        "Arial":	'arial,helvetica,sans-serif',
                        "Courier New":	'courier new,courier,monospace',
                        "Georgia":	'georgia,times new roman,times,serif',
                        "Tahoma":	'tahoma,arial,helvetica,sans-serif',
                        "Times New Roman":	'times new roman,times,serif',
                        "Verdana":	'verdana,arial,helvetica,sans-serif',
                        "Impact":	'impact',
                        "Wingdings":	'wingdings'};
                        editors[i].generate();
                    }
                }
				
				// Activate the tab with the new fields
				if(configtabsAddFields){
					var iAF = YAHOO.util.Dom.get('id_boundary_add_fields');					
					var fs = YAHOO.util.Dom.getAncestorByTagName(iAF,'fieldset');
					for(var tI in tabsCache[i]){
						if (tabsCache[i][tI] == fs.id){
							tabView[i].set('activeIndex',tI);
							break;
						}
					}					
				}

				i++;
			}
			
			// Listener for when a QF Error is fired. To improve
			document.addEventListener ('DOMNodeInserted', fShowErrorTab, false);
	
	});
})();