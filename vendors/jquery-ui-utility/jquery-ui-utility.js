/**
 * Copyright (c) 2011, Bonafide, Inc. All rights reserved.
 * http://www.bonafide.com
 * @author Victor Chen
 * @version 1.0.1
 * @dependency /js/jquery/jquery-1.4.4.min.js
 * @dependency /js/jquery/jquery-block.js
 */

(function($) {
	$.fContainsKey = function(object, key) {
		if ((object !== undefined) && (key !== undefined)) {
			return (object[key] !== undefined);
		}
		return false;
	};
	$.fContainsKeys = function(object, keys) {
		if ((object !== undefined) && (keys !== undefined)) {
			if (keys.length > 0) {
				for (var idx = 0; idx < keys.length; idx++) {
					if (!$.fContainsKey(object, keys[idx])) {
						return false;
					}
				}
				return true;
			}
		}
		return false;
	};
	$.fDefaultString = function(text) {
		if ((text !== undefined) && (text != null)) return text;
		return '';
	};
	$.fCapitalize = function(text) {
		return $.fDefaultString(text).toLowerCase().replace(/\b[a-z]/g,
			function(letter) {return letter.toUpperCase();}
		);
	};
	$.fIsTextBlank = function(text) {
		if (text !== undefined) {
			return ($.trim(text).length == 0);
		}
		return true;
	};
	$.fIsFieldBlank = function(name) {
		var fields = $('[name=' + name + ']');
		if (fields.size() == 1) {
			return $.fIsTextBlank(fields.val());
		}
		return false;
	};
	$.fIsKeyValueBlank = function(object, key) {
		if ($.fContainsKey(object, key)) {
			return $.fIsTextBlank(object[key]);
		}
		return true;
	};
	$.fApply = function(text, def) {
		text = $.fDefaultString(text);
		def = $.fDefaultString(def);
		return (($.fIsTextBlank(text)) ? (def) : (text));
	};
	$.fToNumber = function(text) {
		if (!$.fIsTextBlank(text)) {
			text = (new String(text)).replace(/[^0-9\.\-\(\)]+/g, '');
			var number = (((text.length > 2) && (text.indexOf('(') == 0) && (text.substring(text.length - 1) == ')')) ? (-1 * Number(text.replace(/[\(\)]+/g, ''))) : (Number(text.replace(/[\(\)]+/g, ''))));
			return ((isNaN(number)) ? (0) : (number));
		}
		return 0;
	};
	$.fToInt = function(text) {
		return parseInt($.fToNumber(text));
	};
	$.fLeft = function(text, size) {
		if ((!$.fIsTextBlank(text)) && ($.fToInt(size) > 0)) {
			return ((text.length >= size) ? (text.substring(0, size)) : (text));
		}
		return '';
	};
	$.fRight = function(text, size) {
		if ((!$.fIsTextBlank(text)) && ($.fToInt(size) > 0)) {
			return ((text.length >= size) ? (text.substring(text.length - size)) : (text));
		}
		return '';
	};
	$.fLeftPad = function(text, padder, length) {
		if ((!$.fIsTextBlank(text)) && ((padder = $.fDefaultString(padder)).length > 0) && ($.fToInt(length) > 0)) {
			if (length > text.length) {
				var times = $.fToInt((length - text.length) / padder.length);
				for (var idx = 0; idx < times; idx++) {
					text = padder + text;
				}
			}
			return text;
		}
		return '';
	};
	$.fRightPad = function(text, padder, length) {
		if ((!$.fIsTextBlank(text)) && ((padder = $.fDefaultString(padder)).length > 0) && ($.fToInt(length) > 0)) {
			if (length > text.length) {
				var times = $.fToInt((length - text.length) / padder.length);
				for (var idx = 0; idx < times; idx++) {
					text = text + padder;
				}
			}
			return text;
		}
		return '';
	};
	$.fTabbed = function(e, callback) {
		if ((e !== undefined) && (e != null)) {
			if (e.which == $.ui.keyCode.TAB) {
				if (!e.shiftKey) {
					e.preventDefault();
					if (callback !== undefined) {
						callback();
					}
				}
			}
		}
	};
	$.fShiftTabbed = function(e, callback) {
		if ((e !== undefined) && (e != null)){
			if (e.which == $.ui.keyCode.TAB){
				if (e.shiftKey){
					e.preventDefault();
					if (callback !== undefined){
						callback();
					}
				}
			}
		} 
	};
	$.fIsValidCreditCard = function(number) {
		if (number !== undefined) {
			number = String(number);
			if (!$.fIsTextBlank(number)) {
				var total = 0;
				for (var idx = (number.length - 1), ctr = 0; idx >= 0; idx--, ctr++) {
					var digit = $.fToInt(number.substring(idx, (idx + 1)));
					if ((digit >= 0) && ( digit <= 9)) {
						total += (((ctr % 2) == 0) ? (digit) : ((parseInt((2 * digit) / 10)) + ((2 * digit) % 10)));
					}
				}
				if (total > 0) {
					if ((total % 10) == 0) {
						return true;
					}
				}
			}
		}
		return false;
	};
	$.fClearTimeout = function(timeout) {
		if (timeout !== undefined) {
			if (timeout) {
				clearTimeout(timeout);
				timeout = null;
			}
		}
	};
	$.fToName = function(fn, mn, ln) {
		fn = $.trim($.fDefaultString(fn));
		mn = $.trim($.fDefaultString(mn));
		ln = $.trim($.fDefaultString(ln));
		if ((!$.fIsTextBlank(fn)) || (!$.fIsTextBlank(mn)) || (!$.fIsTextBlank(ln))) {
			return (
				fn + (((!$.fIsTextBlank(fn)) && ((!$.fIsTextBlank(mn)) || (!$.fIsTextBlank(ln)))) ? (' ') : ('')) +
				mn + (((!$.fIsTextBlank(ln)) && ((!$.fIsTextBlank(mn)) || (!$.fIsTextBlank(fn)))) ? (' ') : ('')) +
				ln
			);
		}
		return '';
	};
	$.fToStreetApartment = function(a1, a2) {
		a1 = $.trim($.fDefaultString(a1));
		a2 = $.trim($.fDefaultString(a2));
		return a1 + (((!$.fIsTextBlank(a1)) && (!$.fIsTextBlank(a2))) ? (' ') : ('')) + a2;
	};
	$.fToCityStateZipCode = function(ct, st, zp) {
		ct = $.trim($.fDefaultString(ct));
		st = $.trim($.fDefaultString(st));
		zp = $.trim($.fDefaultString(zp));
		var composite = ct;
		if ((!$.fIsTextBlank(composite)) && ((!$.fIsTextBlank(st)) || (!$.fIsTextBlank(zp)))) composite = composite + ', '; composite = composite + ((!$.fIsTextBlank(st)) ? (st.toUpperCase()) : (''));
		if ((!$.fIsTextBlank(composite)) && (!$.fIsTextBlank(zp))) composite = composite + ' '; composite = composite + ((!$.fIsTextBlank(zp)) ? (zp) : (''));
		return composite;
	};
	$.fToAddress = function(a1, a2, ct, st, zp) {
		var streetApartment = $.fToStreetApartment(a1, a2);
		var cityStateZipCode = $.fToCityStateZipCode(ct, st, zp);
		return streetApartment + (((!$.fIsTextBlank(streetApartment)) && (!$.fIsTextBlank(cityStateZipCode))) ? (', ') : ('')) + cityStateZipCode;
	};
	/**
	 * @title
	 * @of
	 * @callback
	 */
	$.fMessage = function(message, options) {
		if (!$.fIsTextBlank(message)) {
			$('div.dialogMessage').remove();
			$('<div class=\'dialogMessage\'></div>').html(message).dialog({
				width: 375,
				modal: true,
				autoOpen: false,
				resizable: false,
				title: (
					(!$.fIsKeyValueBlank(options, 'title')) ?
					(options['title']) :
					('System Message')
				),
				buttons: {
					'OK': function() {
						$(this).dialog('close');
						if ($.fContainsKey(options, 'callback')) {
							options['callback']();
						}
					}
				},
				position: {
					of: (
						(!$.fIsKeyValueBlank(options, 'of')) ?
						(options['of']) :
						(window)
					)
				}
			}).dialog('open');
		}
	};
	/**
	 * @title
	 * @of
	 * @onload
	 * @violate
	 * @next
	 * @hold
	 */
	$.fDecision = function(message, options) {
		if (!$.fIsTextBlank(message)) {
			$('div.dialogMessage').remove();
			$('<div class=\'dialogMessage\'></div>').html(message).dialog({
				width: 375,
				modal: true,
				autoOpen: false,
				resizable: false,
				title: (
					(!$.fIsKeyValueBlank(options, 'title')) ?
					(options['title']) :
					('Are you sure?')
				),
				buttons: {
					'Yes': function() {
						if ((($.fContainsKey(options, 'violate')) && (!options['violate']())) ||
							(!$.fContainsKey(options, 'violate'))) {
							$(this).dialog('close');
							if ($.fContainsKey(options, 'next')) {
								options['next']();
							}
						}
					},
					'No': function() {
						$(this).dialog('close');
						if ($.fContainsKey(options, 'hold')) {
							options['hold']();
						}
					}
				},
				position: {
					of: (
						(!$.fIsKeyValueBlank(options, 'of')) ?
						(options['of']) :
						(window)
					)
				},
				open: function() {
					$(this).closest('.ui-dialog').find(".ui-dialog-buttonpane button:contains('No')").fDeactivate();
					$(this).closest('.ui-dialog').find(".ui-dialog-buttonpane button:contains('Yes')").trigger('focus');
				}
			}).dialog('open');
			if ($.fContainsKey(options, 'onload')) options['onload']();
		}
	};
	$.fFormMessage = function(message, callback, of) {
		$.fMessage(message, {
			'title': 'Form Validation',
			'callback': callback,
			'of': of
		});
	};
	/**
	 * @violate
	 * @name
	 * @of
	 * @callback
	 * @message
	 */
	$.fFormValidate = function(options) {
		var invalid = (
			(($.fContainsKey(options, 'violate')) ? (options['violate']()) :
			(($.fContainsKey(options, 'name')) ? ($.fIsFieldBlank(options['name'])) : (false)))
		);
		if (invalid) {
			var callback = function() {
				if ($.fContainsKey(options, 'callback')) {
					options['callback']();
				}
				else if ($.fContainsKey(options, 'name')) {
					var fields = $('[name=' + options['name'] + ']');
					if (fields.size() == 1) {
						fields.trigger('focus');
					}
				}
			};
			if ($.fContainsKey(options, 'message')) {
				$.fFormMessage(options['message'], callback, options['of']);
			}
			else callback();
			return false;
		}
		return true;
	};
	$.fSimpleFormValidate = function(name, message, of) {
		if ((name !== undefined) && (message !== undefined)) {
			return $.fFormValidate({
				'name': name,
				'message': message,
				'of': of
			});
		}
		return true;
	};
	$.fLoader = function(action) {
		if ($.blockUI) {
			action = ((action !== undefined) ? (action) : ('Loading'));
			$.blockUI({message: '<b>' + action + ', please wait...</b><img src="/meds/images/ipharm-loading-bar.gif"/>'});
		}
	};
	$.fUnloader = function() {
		if ($.unblockUI) {
			$.unblockUI();
		}
	};
	/**
	 * @form
	 * @action
	 * @target
	 */
	$.fProcessor = function(url, options) {
		if (!$.fIsTextBlank(url)) {
			var forms = (
				(!$.fIsKeyValueBlank(options, 'form')) ?
				($('form[name=' + options['form'] + ']')) :
				($('form'))
			);
			if (forms.size() == 1) {
				$.fLoader(
					(!$.fIsKeyValueBlank(options, 'action')) ?
					(options['action']) :
					('Processing')
				);
				setTimeout(function() {
						var dom = forms.get(0);
						dom.target = (
							(!$.fIsKeyValueBlank(options, 'target')) ?
							(options['target']) :
							('_self')
						);
						dom.action = url;
						dom.submit();
					},
					500
				);
			}
		}
	};
	/**
	 * @action
	 * @form
	 * @success
	 * @error
	 */
	$.fAsyncPost = function(url, options) {
		if (!$.fIsTextBlank(url)) {
			$.fLoader(
				(!$.fIsKeyValueBlank(options, 'action')) ?
				(options['action']) :
				('Processing')
			);
			setTimeout(function() {
				$.ajax({
					type: 'POST',
					url: url,
					data: (
						(!$.fIsKeyValueBlank(options, 'form')) ?
						($('form[name=' + options['form'] + ']').serialize()) :
						((!$.fIsKeyValueBlank(options, 'data')) ? options['data'] :(''))
					),
					dataType: (!$.fIsKeyValueBlank(options, 'dataType') ? options['dataType'] : 'json'),
					cache: false,
					success: function(object) {
						$.fUnloader();
						if ($.fContainsKey(options, 'success')) {
							options['success'](object);
						}
					},
					error: function() {
						$.fUnloader();
						if ($.fContainsKey(options, 'error')) {
							options['error']();
						}
					}
				});},
				500
			);
		}
	};
	
	$.fIsEmail = function(str) {
		var search_str = /^[\w\-\.]+@[\w\-\.]+(\.\w+)+$/;
		return search_str.test(str);
	}
	
	$.fn.fRequired = function() {
		return this.each(function() {
			$(this)
				.blur(function() {
					if ($.fIsTextBlank($(this).val())) {
						if (!$(this).hasClass('attention')) {
							$(this).addClass('attention');
						}
					}
					else {
						$(this).removeClass('attention');
					}
				})
				.trigger('blur');
			}
		);
	};
	$.fn.fTrackable = function() {
		return this.each(function() {
			$(this)
				.focus(function() {
					$('.focusin').removeClass('focusin');
					$(this).addClass('focusin');
				})
				.blur(function() {
					$(this).removeClass('focusin');
				});
			}
		);
	};
	/**
	 * @title
	 */
	$.fn.fHintable = function() {
		return this.each(function() {
			if (!$.fIsTextBlank($(this).attr('title'))) {
				$(this)
					.focus(function() {
						if ($(this).val() == $(this).attr('title')) $(this).val('');
						$(this).removeClass('hint');
					})
					.blur(function() {
						if (($.fIsTextBlank($(this).val())) || ($(this).val() == $(this).attr('title'))) {
							if (!$(this).hasClass('hint')) $(this).addClass('hint');
							$(this).val($(this).attr('title'));
						}
					})
					.trigger('blur');
				}
			}
		);
	};
	/**
	 * @highlight
	 */
	$.fn.fHighlightable = function() {
		return this.each(function() {
			$(this)
				.mouseover(
					function() {
						$(this).addClass('highlight');
					}
				)
				.mouseout(
					function() {
						if (($(this).data('editing') === undefined) ||
							(!$(this).data('editing'))) {
							$(this).removeClass('highlight');
						}
					}
				)
				.click(
					function() {
						if (($(this).data('editing') === undefined) ||
							(!$(this).data('editing'))) {
							$(this).data('editing', true);
						}
					}
				)
				.focusout(
					function() {
						$(this).removeClass('highlight').data('editing', false);
					}
				);
			}
		);
	};
	/**
	 * @title
	 * @longdesc
	 */
	$.fn.fExplainable = function() {
		return this.each(function() {
			if (!$.fIsTextBlank($(this).attr('longdesc'))) {
				$(this)
					.css('cursor', 'pointer')
					.click(function() {
						$.fMessage($(this).attr('longdesc'), {'title': $(this).attr('title')});
					});
				}
			}
		);
	};
	$.fn.fEditable = function() {
		return this.each(function() {
			$(this).find('div.display')
				.mouseover(
					function() {
						$(this).addClass('highlight');
					}
				)
				.mouseout(
					function() {
						$(this).removeClass('highlight');
					}
				)
				.click(
					function() {
						$(this).removeClass('highlight').hide().siblings('div.editing').show().find('span.icons').hide().siblings('span.links').show();
						var field = $(this).siblings('div.editing').find('div.element>input[type=text]:first');
						if (field.hasClass('dollar')) field.trigger('select'); else field.trigger('focus');
					}
				);
			$(this).find('a.save')
				.click(
					function() {
						var anchor = $(this);
						var reset = function() {anchor.closest('div.editing').hide().siblings('div.display').show();};
						anchor.closest('span.links').hide().siblings('span.icons').show();
						setTimeout(function() {
							$.ajax({
								type: 'POST',
								url: anchor.find('input[type=hidden].editableUrl').val(),
								data: $('form').serialize(),
								dataType: 'json',
								cache: false,
								success: function(object) {
									var callback = anchor.find('input[type=hidden].editableCallback').val();
									if (object.display !== undefined) anchor.closest('div.editing').siblings('div.display').text(object.display);
									if (!$.fIsTextBlank(callback)) eval(callback);
									reset();
								},
								error: function() {
									reset();
								}
							})},
							500
						);
					}
				);
			$(this).find('a.cancel')
				.click(
					function() {
						$(this).closest('div.editing').hide().siblings('div.display').show();
					}
				);
			}
		);
	};
	var __fSwapIndicator = function(anchor, type) {
		if (anchor !== undefined) {
			if (!$.fIsTextBlank(type)) {
				if (type == 'expand') {
					anchor.text(anchor.text().replace('show', 'hide'));
					anchor.nextAll('img[src$=down.png]').each(function(index) {
						$(this).attr('src', $(this).attr('src').replace('down.png', 'up.png'));
					});
				}
				else if (type == 'collapse') {
					anchor.text(anchor.text().replace('hide', 'show'));
					anchor.nextAll('img[src$=up.png]').each(function(index) {
						$(this).attr('src', $(this).attr('src').replace('up.png', 'down.png'));
					});
				}
			}
		}
	};
	/**
	 * @expand
	 * @collapse
	 */
	$.fn.fExpandable = function(expand, collapse) {
		return this.each(function() {
			if ((expand !== undefined) && (collapse !== undefined)) {
				$(this).toggle(
					function() {__fSwapIndicator($(this), 'expand'); expand();},
					function() {__fSwapIndicator($(this), 'collapse'); collapse();}
				);
			}}
		);
	};
	/**
	 * @collapse
	 * @expand
	 */
	$.fn.fCollapsable = function(collapse, expand) {
		return this.each(function() {
			if ((collapse !== undefined) && (expand !== undefined)) {
				$(this).toggle(
					function() {__fSwapIndicator($(this), 'collapse'); collapse();},
					function() {__fSwapIndicator($(this), 'expand'); expand();}
				);
			}}
		);
	};
	$.fn.fActivate = function() {
		return this.each(function() {
			$(this).css('color', '#1C94C4').attr('disabled', false);
		});
	};
	$.fn.fDeactivate = function(disabled) {
		return this.each(function() {
			$(this).css('color', '#808080').attr('disabled', ((disabled !== undefined) && (disabled)));
		});
	};
})(jQuery);