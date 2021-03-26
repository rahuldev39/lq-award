jQuery(document).ready(function($){
	var gallery = $('.cd-gallery'),
		foldingPanel = $('.cd-folding-panel'),
		mainContent = $('.cd-main');
	/* open folding content */
	gallery.on('click', 'a', function(event){
		event.preventDefault();
		openItemInfo($(this).attr('href'));
	});

	/* close folding content */
	foldingPanel.on('click', '.cd-close',  function(event){
		event.preventDefault();
		toggleContent('', false);
	});
    $('.cd-overlay').on('click', function(event){
        event.preventDefault();
		toggleContent('', false);
    });
	gallery.on('click', function(event){
		/* detect click on .cd-gallery::before when the .cd-folding-panel is open */
		if($(event.target).is('.cd-gallery') && $('.fold-is-open').length > 0 ) toggleContent('', false);
	})

	function openItemInfo(url) {
		var mq = viewportSize();
		if( gallery.offset().top > $(window).scrollTop() && mq != 'mobile') {
			/* if content is visible above the .cd-gallery - scroll before opening the folding panel */
			$('body,html').animate({
				'scrollTop': gallery.offset().top
			}, 100, function(){ 
	           	toggleContent(url, true);
	        }); 
	    } else if( gallery.offset().top + gallery.height() < $(window).scrollTop() + $(window).height()  && mq != 'mobile' ) {
			/* if content is visible below the .cd-gallery - scroll before opening the folding panel */
			$('body,html').animate({
				'scrollTop': gallery.offset().top + gallery.height() - $(window).height()
			}, 100, function(){ 
	           	toggleContent(url, true);
	        });
		} else {
			toggleContent(url, true);
		}
	}

	function toggleContent(url, bool) {
		if( bool ) {
			/* load and show new content */
			var foldingContent = foldingPanel.find('.cd-fold-content');
			foldingContent.load(url+' .cd-fold-content > *', function(event){
				setTimeout(function(){
					$('body').addClass('overflow-hidden');
					foldingPanel.addClass('is-open');
					mainContent.addClass('fold-is-open');
				}, 100);
				
			});
		} else {
			/* close the folding panel */
			var mq = viewportSize();
			foldingPanel.removeClass('is-open');
			mainContent.removeClass('fold-is-open');
			
			(mq == 'mobile' || $('.no-csstransitions').length > 0 ) 
				/* according to the mq, immediately remove the .overflow-hidden or wait for the end of the animation */
				? $('body').removeClass('overflow-hidden')
				
				: mainContent.find('.cd-item').eq(0).one('webkitTransitionEnd otransitionend oTransitionEnd msTransitionEnd transitionend', function(){
					$('body').removeClass('overflow-hidden');
					mainContent.find('.cd-item').eq(0).off('webkitTransitionEnd otransitionend oTransitionEnd msTransitionEnd transitionend');
				});
		}
		
	}

	function viewportSize() {
		/* retrieve the content value of .cd-main::before to check the actua mq */
		return window.getComputedStyle(document.querySelector('.cd-main'), '::before').getPropertyValue('content').replace(/"/g, "").replace(/'/g, "");
	}
});


function sortTable() {
	var table, rows, switching, i, x, y,t, shouldSwitch;
	table = document.getElementsByClassName("winner-table");
	 
	for (t = 0; t < table.length ; t++) {
	 switching = true;
	/*Make a loop that will continue until
	no switching has been done:*/
	while (switching) {
	  //start by saying: no switching is done:
	  switching = false;
	  rows = table[t].rows;
	  console.log(rows)
	  /*Loop through all table rows (except the
	  first, which contains table headers):*/
	  for (i = 1; i < (rows.length - 1); i++) {
		//start by saying there should be no switching:
		shouldSwitch = false;
		/*Get the two elements you want to compare,
		one from current row and one from the next:*/
   
		x = $(rows[i]).find('td:eq(0) span').text().trim();
		y = $(rows[i+1]).find('td:eq(0) span').text().trim();
		//check if the two rows should switch place:
		if (x.toLowerCase() > y.toLowerCase()) {
		  //if so, mark as a switch and break the loop:
		  shouldSwitch = true;
		  
		  break;
		}
	  }
	  if (shouldSwitch) {
		/*If a switch has been marked, make the switch
		and mark that a switch has been done:*/
		rows[i].parentNode.insertBefore(rows[i + 1], rows[i]);
		switching = true;
	  }
	}

	}

	
  };
  sortTable()