
	'use strict';

	// used in demos later on to merge default options with demo options...
	function extend(a, b) { // extend a with properties of b not in a; simple version
		for(var key in b) {
			if(!a.hasOwnProperty(key)) {
				a[key] = b[key];
			}
		}
		return a;
	}

	/**
	 * returns a string used in <input> fields to mark the min date
	 * for one of the range demos...
	 * 
	 * @return {String} String of date in format 'YYYY-MM-DD'
	 */
	var getTodayString = function() {
			var today = new Date();

			return today.getFullYear() + '-' +
				((today.getMonth() + 1) + '').replace(/^(\d)$/, '0$1') + '-' +
				(today.getDate() + '').replace(/^(\d)$/, '0$1');
		};

		/**
		 * The following options are for demos from datePicker
		 * these options render events, today icon and icons for
		 * the amount of events per day (excl 'disabled'), etc.
		 * Will be used in all other examples as well (extendet).
		 */
	var options = {
			weekDays: ['So', 'Mo', 'Di', 'Mi', 'Do', 'Fr', 'Sa'],
			months: ['Januar', 'Februar', 'März', 'April', 'Mai', 'Juni',
				'Juli', 'August', 'September', 'Oktober', 'November', 'Dezember'],

			sundayBased: false,
			renderWeekNo: true,
			equalHight: true,
			events: events, // external data... see events.js

			template: {
				row: '<td class=""><span class=""{{event}} data-day=\'{"day":"{{day}}", "month":"{{month}}", "year":"{{year}}"}\'>{{day-event}}{{today}}</span></td>',
				/**
				 * rendering events, replacing {{event}} in template.row
				 */
				event: function(day, date, event) {
					var text = [],
						uuids = [],
						someExtra = '';

					for (var n = 0, m = event.length; n < m; n++) {
						event[n].text && text.push('- ' + event[n].text);

						uuids.push(event[n]._id);

						if (event[n].extra) { // extend functionality...
							someExtra = event[n].extra;
						}
					}
					text = text.join("\n");

					return text ? ' title="' + text + '"' +
						' data-uuids=\'[' + uuids.join(', ') + ']\'' +
						(someExtra ? ' data-name="' + someExtra + '"' : '') : '';
				},
				/**
				 * rendering today; just for fun..., replacing {{today}} in template.row
				 */
				today: function(day, date) {
					return '';
				},
				/**
				 * rendering every day, replacing {{day-event}} in template.row
				 */
				day: function(day, date, event) {
					var length = event.length;

					for (var n = length; n--; ) { // check if it's only a 'disabled' event
						if (event[n].type && event[n].type === 'disabled') { // or event[n].disabled
							length--;
						}
					}
					if (length > 1) {
						return day + '<span class="count-icon">' + length + '</span>';
					}
				}
			},
			/**
			 * Some testings for input with no value but it should be time only picker...
			 * @param  {[type]} element [description]
			 * @return {String}         The value of the input field
			 */
			readValue: function(element) {
				if (!element.value && element.getAttribute('data-type') === 'time') { // initial time if empty
					return new Date().toTimeString().split(' ')[0]; // triggers default behavior
				}

				return element.value; // triggers default behavior
			}
		},
		/**
		 * Can be used in options.renderCallback;
		 * Call like: funcName.call(this, container, element, toggled);
		 * Adds a class name options.rangeClass or 'range' to days in calender that define a range
		 * 
		 * @param  {Element} container The datePicker container
		 * @param  {Element} element   The current input field (or other trigger element)
		 * @param  {Boolean} toggled   Toggle indicator of datePicker (see API docu)
		 */
		markRangeDays = function(container, element, toggled) {
			var calOptions = this.calendar.options,
				value_1 = +this.currentInput.value.split(' ')[0].replace(/-/g, ''),
				value_2 = this.currentPartner &&
					+this.currentPartner.value.split(' ')[0].replace(/-/g, ''),
				dates = container.querySelectorAll( // get all displayed days
					'.' + calOptions.prevMonthClass + ', ' +
					'.' + calOptions.nextMonthClass + ', ' +
					'.' + calOptions.currentMonthClass),
				data = '';

			if (this.isOpen && toggled !== undefined && value_2)  {
				for (var n = 0, m = dates.length; n < m; n++) {
					if (data = dates[n].getAttribute(this.options.pickerAttribute)) {
						data = +data.replace(/-(\d)(?=(?:-|$))/g, '0$1').replace(/-/g, '');
						if (value_1 && value_2 && value_1 !== value_2 && (
								(value_1 <= data && value_2 >= data) ||
								(value_1 >= data && value_2 <= data))) {
							dates[n].className += ' ' + (this.options.rangeClass || 'range') +
							(value_1 === data || value_2 === data ? ' range-' +
								(value_1 >= data && value_2 >= data? 'begin' : 'end') : '');
						}
					}
				}
			}
		},
		/**
		 * Can be used in options.renderCallback;
		 * Call like: funcName.call(this, container, element, toggled);
		 * Renders 3 buttons to the end of datePicker with event listener for
		 * clearing the input, jumping to today and for closing the date picker.
		 * Adds 'disabled' attribute in case they can't be used (hide in CSS).
		 * Uses options.clearText, options.todayText and options.closeText (optional).
		 * Today button has an attribute data-picker="", so it works like day in calender
		 * where click event is picked up internaly.
		 * 
		 * @param  {[type]} container [description]
		 * @param  {[type]} element   [description]
		 * @param  {[type]} toggled   [description]
		 * @return {[type]}           [description]
		 */
		addButtons = function(container, element, toggled) {
			var _today = new Date(),
				today = _today.getFullYear() + '-' + (_today.getMonth() + 1) + '-' + _today.getDate(),
				date = this.date.year + '-' + +this.date.month + '-' + +this.date.day,
				isFrom = element.hasAttribute(this.options.rangeStartAttribute),
				isRange = this.currentPartner,
				value_2 = isRange && +this.currentPartner.value.split(' ')[0].replace(/-/g, ''),
				minDate = +(element.getAttribute(this.options.minDateAttribute) || this.options.minDate).replace(/-/g, ''),
				maxDate = +(element.getAttribute(this.options.maxDateAttribute) || this.options.maxDate).replace(/-/g, ''),
				_today = +today.replace(/-(\d)(?=(?:-|$))/g, '0$1').replace(/-/g, ''),
				todayPossible = (today !== date || !element.value) && minDate <= _today && _today <= maxDate && (
					isRange ? (isFrom ? !value_2 || value_2 >= _today : !value_2 || value_2 <= _today) : true);

			this.isOpen && toggled !== undefined && container.insertAdjacentHTML('beforeend', // render buttons...
				'<div class="dp-footer">' +
					'<button class="action clear"' + (this.currentInput.value ? '' : ' disabled') +
						' type="button">' + (this.options.clearText || 'clear') + '</button>' +
					'<button class="action today"' + (todayPossible ? '' : ' disabled') +
						' data-picker="' + today + '" type="button">' + (this.options.todayText || 'today') + '</button>' +
					'<button class="action close" type="button">' + (this.options.closeText || 'close') + '</button>' +
				'</div>');

			this._hasListeners = this._hasListeners || (function(_this) { // ...and add event listeners (once)
				container.addEventListener('click', function(e) {
					var target = e.target,
						className = target.className;

					if (/action/.test(className)) {
						if (/close/.test(className)) {
							_this.toggle();
						} else if (/clear/.test(className)) {
							_this.currentInput.value = '';
							_this.toggle(true);
						} 
					}
				});

				return true; // make this._hasListeners true for next call of renderCallback
			})(this);
		};




	// ------------------- DEMO for input.date-1 ------------------ //
	// Regular example that enables all kinds of different formats
	// and ranges and demonstrates the default possibilities of
	// datePicker... (except extra features defined in default options)
	// ------------------------------------------------------------ //
	window.myDatePicker_1 = new DatePicker('.userinfocontent  .date-1', options);

		

	// ------------------- DEMO for input.date-11 ----------------- //
	// Example with marked range days.
	// ------------------------------------------------------------ //
	// first set input fields to a minimum date
	[].map.call(document.querySelectorAll('.date-11'), function(elm, a) {
		elm.setAttribute('data-mindate', getTodayString());
	});

	window.myDatePicker_11 = new DatePicker('.userinfocontent .date-11', extend({
		closeOnSelect: false,
		renderCallback: function(container, element, toggled) {
			markRangeDays.call(this, container, element, toggled);
			addButtons.call(this, container, element, toggled);

			return true; // triggers default behaviour
		}
	}, options));


	// ------------------- DEMO for input.date-2 ------------------ //
	// Example for hidden input field triggered by a button and
	// rendering a formatted value to a disabled input field.
	// ------------------------------------------------------------ //
	var getInput = function(element, hidden) {
			return element.parentNode.querySelector('input' + (hidden ? '[type="hidden"]' : ''));
		},
		changeValueFormat = function(value) { // some dummy function...
			var date = new Date(value + 'T00:00:00.000Z');
			return date.toDateString();
		};

	window.myDatePicker_2 = new DatePicker('.userinfocontent .date-2', extend({
		/**
		 * Initially render all values in input fields useing converted
		 * values from hidden input fields.
		 * 
		 * @param  {ElementList} elements All elements datePicker is initialized to
		 */
		initCallback: function(elements) {
			var input,
				hiddenInput;

			for (var n = elements.length; n--; ) {
				input = getInput(elements[n]);
				hiddenInput = getInput(elements[n], true);

				input.value = changeValueFormat(hiddenInput.value);
			}
		},
		renderCallback: function(container, element, toggled) {
			return getInput(element); // triggers default behaviour on certain element
		},
		renderValue: function(container, element, value) {
			getInput(element).value = changeValueFormat(value);
			return getInput(element, true); // triggers default behaviour on certain element
		},
		readValue: function(element) {
			var value = getInput(element, true).value;

			getInput(element).value = changeValueFormat(value);
			return value;
		}
	}, options));


	// ------------------- DEMO for input.date-3 ------------------ //
	// Example like the above but then year, month and day get
	// rendered in seperate fields.
	// ------------------------------------------------------------ //
	var getInputs = function(element, hidden) {
			return element.parentNode.querySelectorAll('input');
		};

	window.myDatePicker_3 = new DatePicker('.userinfocontent .date-3', extend({
		renderCallback: function(container, element, toggled) {
			return getInputs(element)[0];
		},
		renderValue: function(container, element, value) {
			var inputs = getInputs(element),
				val = value.split('-');

			inputs[3].value = value;
			inputs[0].value = val[0];
			inputs[1].value = val[1]; // this.options.months[+val[1] - 1];
			inputs[2].value = val[2];
		},
		readValue: function(element) {
			var value = getInputs(element)[3].value;

			this.options.renderValue.call(this, undefined, element, value);
			return value;
		}
	}, options));


	// ------------------- DEMO for input.date-4 ------------------ //
	// Example with data from variables.
	// ------------------------------------------------------------ //
	var dates = window.dates = {
			'date-1': '2016-06-23',
			'date-2': '2016-07-26',
			'date-3': '2016-08-28'
		},
		dataAttr = 'data-date',
		changeValueFormat_de = function(value, options) {
			var parts = value.split(' ')[0].split('-'),
				date = new Date(parts[0], parts[1] - 1, parts[2] || 0);

			return options.weekDaysLong[date.getDay()] + ', ' + date.getDate() + '. ' +
				options.months[date.getMonth()] + ' ' + date.getFullYear();
		};

	window.myDatePicker_4 = new DatePicker('.userinfocontent .date-4', extend({
		weekDaysLong:
			['Sonntag', 'Montag', 'Dienstag', 'Mittwoch', 'Donnerstag', 'Freitag', 'Samstag'],
		initCallback: function(elements) {
			for (var n = elements.length; n--; ) {
				elements[n].value =
					changeValueFormat_de(dates[elements[n].getAttribute(dataAttr)], this.options);
			}
		},
		renderValue: function(container, element, value) {
			dates[element.getAttribute(dataAttr)] = value;
			element.value = changeValueFormat_de(value, this.options);
		},
		readValue: function(element) {
			return dates[element.getAttribute(dataAttr)];
		}
	}, options));


	// ------------------- DEMO for input.date-5 ------------------ //
	// Example with less markup.
	// ------------------------------------------------------------ //
	window.myDatePicker_5 = new DatePicker('.userinfocontent .date-5', extend({
		renderWeekNo: false,
		equalHight: false,
		datePickerClass: 'date-picker div-based',
		template: {
			start: function(month, year) { // rendering week days
				return '{{days}}'
			},
			daysOfWeek: '<div class="item">{{day}}</div>',
			colGlue: '',
			row: '<div class="item{{day-event}}">{{day}}</div>',
			end: function() {return ''},
			day: function(days, date) {
				if (date.getDay() === (this.options.sundayBased ? 0 : 1)) {
					return ' cleared-day';
				}
				return ' ';
			}
		}
	}, options));


	// ------------------- DEMO for input.date-6 ------------------ //
	// Example with today, clear and close button (stays open).
	// ------------------------------------------------------------ //
	window.myDatePicker_6 = new DatePicker('.userinfocontent .date-6', extend({
		renderWeekNo: true,
		closeOnSelect: false,

		clearText: '', // following are optional for different languages
		todayText: '',
		closeText: 'exit', // prints 'exit' in place of default 'close'

		renderCallback: function(container, element, toggled) {
			addButtons.call(this, container, element, toggled);

			return true; // triggers default behaviour
		}
	}, options));
