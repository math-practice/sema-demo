$(function() {

	/* Resize iframes */

	/*
	 * 21.10.14 iframe 동적환경에서 적용X -> css로 맞춤 const aspect = 1 / (16 / 9); var
	 * resizeIframes = function() { $("iframe.youtube").each(function() {
	 * $(this).height($(this).width() * aspect); }); };
	 */

	/* Make expandable/collapsable sections */
	$(".is-expandable-toggle").click(function() { // $("body").on("click",
													// ".is-expandable-toggle",
													// function() {
		var $parent = $(this).closest(".is-expandable");
		$parent.toggleClass("is-expanded");
		// resizeIframes();
		if ($(this).hasClass("is-expandable-toggle-hide")) {
			$(this).hide();
		}
	});

	/* Make swappable sections for thumbnail/slideshow */
	$(".is-swappable-toggle").click(function(e) { // $("body").on("click",
													// ".is-swappable-toggle",
													// function(e) {
		e.preventDefault();
		var $parent = $(this).closest(".is-expandable");
		var $buttons = $parent.find(".is-swappable-toggle");
		$buttons.each(function() {
			$(this).toggleClass("is-swappable-on");
		})
		var $items = $parent.find(".is-swappable");
		$items.each(function() {
			$(this).toggleClass("is-swappable-on");
		})
		// resizeIframes();
		e.stopPropagation();
	});

	/* Make advanceable slideshows */
	$(".is-advanceable-prev").click(function(e) { // $("body").on("click",
													// ".is-advanceable-prev",
													// function(e) {
		e.preventDefault();
		var $parent = $(this).closest(".is-advanceable");
		var $items = $parent.find(".is-advanceable-items").children();
		var $current = $parent.find(".is-current");
		var $prev = $current.prev();
		$items.removeClass("is-current");
		if ($prev.length == 0) {
			$prev = $items.last();
		}
		$prev.addClass("is-current");
		// resizeIframes();
	});
	$(".is-advanceable-next").click(function(e) { // $("body").on("click",
													// ".is-advanceable-next",
													// function(e) {
		e.preventDefault();
		var $parent = $(this).closest(".is-advanceable");
		var $items = $parent.find(".is-advanceable-items").children();
		var $current = $parent.find(".is-current");
		var $next = $current.next();
		$items.removeClass("is-current");
		if ($next.length == 0) {
			$next = $items.first();
		}
		$next.addClass("is-current");
		// resizeIframes();
	});

	/* Change background color */

	$.fn.isInViewport = function() {
		var elementTop = $(this).offset().top;
		var elementBottom = elementTop + $(this).outerHeight();
		var viewportTop = $(window).scrollTop();
		var viewportBottom = viewportTop + $(window).height();
		return elementBottom > viewportTop && elementTop < viewportBottom;
	};

	var animateBackground = function() {
		$(".is-animated-bg .c-sandbox").each(function() {
			if ($(this).isInViewport()) {
				$("body").addClass("bg-black");
			} else {
				$("body").removeClass("bg-black");
			}
		});
	};
	
	var animateSimbol = function(){
		$(".l-nav-symbol").each(function() {
			if ($(this).isInViewport()) {
				$(".l-nav-sticky").addClass("is-sticky-no");
			} else {
				$(".l-nav-sticky").removeClass("is-sticky-no");
			}
		});
	}

	/* Toggle "back to top" button */
	// 210927 lnb->footer로 위치 이동
	var toggleTop = function() {
		var docH = $(document).height(), // 문서전체높이
		scrollPos = Math.floor($('html, body').scrollTop()
				|| $(window).scrollTop()), // 문서 전체 높이 중 스크롤 위치
		winH = window.innerHeight, // 창높이
		footerH = $('.footer').outerHeight();
		btn_top = $('.l-nav-top');

		var gap = 0;
		gap = docH - footerH - winH;

		if (scrollPos > gap) {
			if (!(btn_top.hasClass('ty02'))) {
				btn_top.removeClass('ty01');
				btn_top.addClass('ty02');
			}
		} else {
			if (!(btn_top.hasClass('ty01'))) {
				btn_top.addClass('ty01');
				btn_top.removeClass('ty02');
			}
		}

		if ($(window).scrollTop() > 49) {
			$(".l-nav-top").addClass("is-visible");
		} else {
			$(".l-nav-top").removeClass("is-visible");
		}
	};

	var backToTop = function() {
		$(window).scrollTop(0);
		animateBackground();
		animateSimbol();
		toggleTop();
	};

	/* Check if window has resized */

	var $window = $(window);
	var width = $window.width();
	var height = $window.height();
	var resized = false;

	window.setInterval(function() {
		if ((width != $window.width()) || (height != $window.height())
				|| !resized) {
			width = $window.width();
			height = $window.height();
			// resizeIframes();
			resized = true;
		}
	}, 200);

	/* Check if window has scrolled */

	window.setInterval(function() {
		animateBackground();
		animateSimbol();
		toggleTop();
	}, 200);

	/* Handle back to top clicking */

	$(".l-nav-top").click(function(e) {
		e.preventDefault();
		backToTop();
	});

	
	/* S : 스크롤 ON OFF 확인중 211209---------- */
    function scroll_on() {
        $('body').on('scroll touchmove mousewheel', function(e) {
            e.preventDefault();
            e.stopPropagation();
            return false;
        });
    }  
    function scroll_off() {
        $('body').off('scroll touchmove mousewheel');
    }
	/* E : 스크롤 ON OFF 확인중 211209---------- */

    /* S : 스크롤 ON OFF 확인중---------- 모바일 작동x */
    function disableScrolling(){
    	var x=window.scrollX;
	    var y=window.scrollY;
		window.onscroll=function(){window.scrollTo(x, y);};
	}	
	function enableScrolling(){
		window.onscroll=function(){};
	}
	/* E : 스크롤 ON OFF 확인중----------*/
    

    /* S : 스크롤 ON OFF 적용 완료 ----------*/
	var scrollBody = 0;
	function scrollBodyOff(){
		scrollBody = $(window).scrollTop();
		
		$('body').css({
			'position':'fixed',
			'overflow-y':'scroll',
			'top': (-1 * scrollBody) + 'px' ,
			'left':'0px',
			'right':'0px',
		});
	}
	function scrollBodyOn(){
		$('body').css({
			'position':'',
			'overflow':'',
			'top':'',
			'left':'',
			'right':'',
		});
		$(window).scrollTop(scrollBody);
	}
    /* E : 스크롤 ON OFF 적용 완료 ----------*/
	
	/* Open/close modal for demoing purposes */

	/*
	 * var openModal = function($modal) { closeModals();
	 * $modal.removeClass("is-hidden"); $("body").addClass("is-showing-modal"); }
	 * var closeModals = function() { $(".c-modal").addClass("is-hidden");
	 * $("body").removeClass("is-showing-modal"); };
	 * 
	 * $("body").on("click", ".modal-open", function(e) { e.preventDefault();
	 * var $modal = $($(this).data("modal")); openModal($modal); });
	 * $("body").on("click", ".modal-close, .c-modal-bg", function(e) {
	 * e.preventDefault(); closeModals(); });
	 */

	// 이중팝업으로 수정
	var Target, doubleTarget, thirdTarget;

	if ($(".c-modal").length) {
		$(".c-modal").attr("tabindex", 0);// 스크롤영역 키보드로 동작
	}

	var openModal = function($modal, clickTarget, triggerCT) {
		$modal.removeClass("is-hidden");
		$("body").addClass("is-showing-modal");
		scrollBodyOff();
		
		if ($modal.closest(".c-modal").hasClass("o_doublepop")) {
			//console.log('(2. 모달2 - 열기)------------------');
			$('body').addClass("pop2");
			triggerCT != undefined ? doubleTarget = triggerCT : doubleTarget = clickTarget;
		} else if ($modal.closest(".c-modal").hasClass("o_thirdpop")) {
			//console.log('(3. 모달3 - 열기)------------------');
			$('body').addClass("pop3");
			triggerCT != undefined ? thirdTarget = triggerCT : thirdTarget = clickTarget;
		} else {
			//console.log('(1. 모달 - 열기)------------------');
			$('body').addClass("pop1");
			triggerCT != undefined ? Target = triggerCT : Target = clickTarget;
		}
		
		$modal.focus();//접근성
	}
	
	var closeModals = function(clickTarget) {
		clickTarget.closest(".o_popwrap").children(".c-modal").addClass("is-hidden");
		
		if (clickTarget.parents(".o_popwrap").find('.c-modal').hasClass("o_doublepop")) {
			//console.log('(2. 모달2 - 닫기)------------------');
			$('body').removeClass('pop2');
			doubleTarget.focus();
		} else if (clickTarget.parents(".o_popwrap").find('.c-modal').hasClass("o_thirdpop")) {
			//console.log('(3. 모달3 - 닫기)------------------');
			$('body').removeClass('pop3');
			thirdTarget.focus();
		} else{
			//console.log('(1. 모달 - 닫기)------------------');
			$('body').removeClass('pop1');
			$("body").removeClass("is-showing-modal");
			Target.focus();
			scrollBodyOn();
		}		
	}
	
	$(".modal-open").click(function(e, triggerCT) {// triggerCT : 팝업 trigger 클릭으로 오픈 시 사용되는 변수						
		e.preventDefault();
		var $modal = $($(this).data("modal"));
		openModal($modal, $(this), triggerCT);
				
	});
	
	$(".modal-close, .c-modal-bg").on('click', function(e) {
		e.preventDefault();
		closeModals($(this));
	});

	// 팝업 접근성
	$(function() {
		// 레이어팝업 닫기 전까지 레이어팝업 안에서 초점이 이동하도록
		$('.o_pfooter .modal-close').on({
			'keydown' : function(e){
				var v_keyCode = e.keyCode || e.which;
				if(v_keyCode == 9){ 
					if(!e.shiftKey){ // tab
						$(this).closest(".c-modal").focus();
						return false;
					}
				}
			}
		});
		
		$('.c-modal').on({
			'keydown' : function(e){
				if (e.target !== e.currentTarget){
					return;
				} else {
					var v_keyCode = e.keyCode || e.which;
					if(v_keyCode == 9){ 
						e.stopPropagation();
						if(e.shiftKey){ // tab + shiftkey
							$(this).find(".modal-close").focus();
							return false;
						}
					}
				}
			}
		});
		/*
		 * $('.c-modal').on({ keydown:function(e){ var keyCode = e.keyCode ||
		 * e.which; if(keyCode == 9){ if(e.shiftKey){ e.preventDefault();
		 * $(this).find('.o_pfooter .pop-close').focus(); } } } });
		 */
	});

	/* Init Seoul GNB */

	// Yjs.Gnb.init('G079', 'seoul-gnb');
	/* Add polyfill for position: sticky */

	var stickyElems = $('.l-nav-sticky');
	Stickyfill.add(stickyElems);

});
