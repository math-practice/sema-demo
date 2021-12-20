$(function () {
    // lnb 더보기 ----------------------------------------------------------
    if($('.o_btn_more').length){
        var event = $('.o_btn_more');
        event.click(function() {
            var eventCheck01 = $(this).closest('.secondary');
            if(!(eventCheck01.hasClass('o_open_detail'))){
                eventCheck01.addClass('o_open_detail');
            }else{
                eventCheck01.removeClass('o_open_detail');
            }
        });
    }
    
    // 검색옵션 ----------------------------------------------------------

    // 간단한 필터-자세한 필터 ----------------------------------------------------------
    if($('.o_btn_filter').length){
        var filter = $('.o_btn_filter');
        filter.click(function() {
            var filterCheck01 = $(this).closest('.bg-grey-30');
            var text = $(this).text();
            if (!(filterCheck01.hasClass('o_open_detail'))) {
                filterCheck01.addClass('o_open_detail');
                //$(this).text(text.replace('자세', '간단'));
            } else {
                filterCheck01.removeClass('o_open_detail');
                //$(this).text(text.replace('간단', '자세'));
            }
        });
    }	
    
    /* 211215 임시 전시와 프로그램 필터 */
    if($('.o_filterbox').length){
	    $('.o_filterbox > a').on("click",function(){
	    	$(this).addClass('o_btn_none');
	    	$(this).siblings().removeClass('o_btn_none');
	    	var filterCheck01 = $(this).closest('.bg-grey-30');
            var text = $(this).text();
            if (!(filterCheck01.hasClass('o_open_detail'))) {
                filterCheck01.addClass('o_open_detail');
            } else {
                filterCheck01.removeClass('o_open_detail');
            }
	    });
    };
    
    // 검색옵션 토글
    $('.o_btn_search').click(function () {
        // .siblings('.o_s_bottom').toggle();
        if($(this).closest('.o_s_top').siblings('.o_s_bottom').hasClass('o_open_detail')){
            $(this).closest('.o_s_top').siblings('.o_s_bottom').removeClass('o_open_detail');
            $(this).attr('title','검색옵션닫힘');
        }else{
            $(this).closest('.o_s_top').siblings('.o_s_bottom').addClass('o_open_detail');
            $(this).attr('title','검색옵션열림');
        }
    });
    // 검색옵션 닫기(검색옵션으로 검색버튼 이동 시 사용) 
    /* $('.o_btn_search').click(function () {
        if(!$(this).closest('.o_s_top').hasClass('o_open_detail')){
            $(this).closest('.o_s_top').addClass('o_open_detail');
            $(this).closest('.o_s_top').siblings('.o_s_bottom').addClass('o_open_detail');
        }
    });*/


    // 검색옵션 닫기 
    $('.o_btn_close').click(function () {
        $(this).closest('.o_s_bottom').siblings('.o_s_top').find('.o_btn_search').attr('title','검색옵션닫힘');
        $(this).closest('.o_s_bottom').removeClass('o_open_detail');
    });
    // 검색옵션 닫기(검색옵션으로 검색버튼 이동 시 사용) 
    /*$('.o_btn_close').click(function () {
    	if($(this).closest('.o_s_bottom').hasClass('o_open_detail')){
    		$(this).closest('.o_s_bottom').removeClass('o_open_detail');
    		$(this).closest('.o_s_bottom').siblings('.o_s_top').removeClass('o_open_detail');
    	}
    });*/

    // 검색옵션 초기화 
    $('.o_btn_reset').click(function(){
       $(this).closest('.c-form')[0].reset();
    });

    // 슬라이드보기 ↔ 그리드보기  ----------------------------------------------------------
    // 슬라이드보기 ↔ 그리드보기 초점
    $('.is-swappable-toggle').on({
        keydown: function(e){
            var keyCode = e.keyCode || e.which; 
            var p = $(this).parent();
            if(keyCode==13) {
                setTimeout(function(){
                    p.find('.is-swappable-toggle.is-swappable-on').focus();
                }, 100);
            }
        }
    })
    
    // 그리드보기 비디오 클릭시 이벤트
    $('.o_btn_vedio').click(function () {
    	var o_index = $(this).parent().index();
    	var o_expandable = $(this).closest('.is-expandable');
    	o_expandable.find('.l-align-right .is-swappable-on').trigger("click");
    	o_expandable.find('.is-advanceable-items').children().removeClass('is-current');
    	o_expandable.find('.is-advanceable-items').children().eq(o_index).addClass('is-current');
    });

    // 달력버튼 ----------------------------------------------------------
    $('.i-button-calendar').click(function () {
        $(this).closest('.c-section').children('.c-calendar-inset').children('.i-calendar').toggle();
    });
    
    // 신청하기>인원추가 ----------------------------------------------------------
    $('.o_btnwrap_add > a.o_btn_add').click(function () {
    	$(this).hide();
        $(this).siblings('.o_btn_del').show();
    });

	// 파일 업로드 커스텀 ----------------------------------------------------------
	var fileTarget = $('.o_filewrap .upload-hidden');
	fileTarget.on('change', function() {
		var files = $(this)[0].files;
		var filename = '';
		var filesize = 0;
		var maxsize = 30 * 1024 * 1024;

		if (window.FileReader) {
			for (var i = 0; i < files.length; i++) {
				filesize += files[i].size;
				if (i == 0) {
					filename += files[i].name;
				} else {
					filename += '/' + files[i].name;
				}
			}
		} else {
		}

		// max size 체크
		if (filesize > maxsize) {
			//alert('30MB이하의 파일만 등록할 수 있습니다.');
			$(this).val("");
			$(this).closest('.o_filewrap').find('.o_upload').html('');
		} else {
			// 추출한 파일명 삽입
			$(this).closest('.o_filewrap').find('.o_upload').html(filename);
		}
	});
	
	//목차 클릭시 해당 아코디온 오픈 및 스크롤 이동 처리
	/*$("a[href^='#']").click(function(event) {
		event.preventDefault();
		
		var idNm = $(this).attr("href"); 
		
		if($(idNm).hasClass("is-expanded") !== true) {
			$($(idNm)).addClass("is-expanded");		
		}
		
		var target = $(this.hash);
		$('html, body').scrollTop(target.offset().top);
	});*/
	
	// 메인 백그라운드 색상 이벤트
	if($('.c-sandbox').length){
		$('body').addClass('bg-black is-animated-bg is-home');
		
	}
	/*if($('.c-sandbox').length){
		$('body').addClass('bg-black is-animated-bg is-home');
		
		if($('.o_video').css("display" == 'none')){
			$('.l-global').css({'padding-top':'0'})
		}else{
			$('.l-global').css({'padding-top':'56.25%'})
		}
	}*/
	


	

	 //전시 상세컨텐츠 더보기버튼
	  $('.o_btn_textmore').click(function(e){
		  e.preventDefault();
		  
	        var textadd = $(".o_textmore").hasClass('o_btnmore')
	        var btn_more = $(this).closest('.o_body').find('.o_textmore')

	        if(textadd === true){
	            $(this).text('더보기');
	            btn_more.removeClass('o_btnmore')
	        }else{
	            $(this).text('간략히보기');
	            btn_more.addClass('o_btnmore')
	        }
	    })
	    
	    //전시 상세컨텐츠 버튼 숨기기
	    var exDetails = $('.o_textmore').height();
	    if(exDetails <= 400){
	    	$('.o_btnwrap').hide();
	    }else{
	    	$('.o_btnwrap').show();
	    }
	  
	    var more = $('.o_Exdetail')
	    
	    more.click(function(){
	    	var more = $(".o_Ex_more").hasClass('Ex_on')
	    	
	    	if(more === true){
	    		$(this).text('자세한 정보');
	    		$('.o_Ex_more').removeClass('Ex_on')
	    	}else{
	    		$(this).text('간략한 정보');
	    		$('.o_Ex_more').addClass('Ex_on')
	    	}
	    })
	  //전시 상세컨텐츠 더보기버튼
	    
	  var video_if = $('.is-expandable .i-button, .is-swappable .c-gallery-next, .is-swappable .c-gallery-prev, .is-swappable .o_btn_vedio')
	// 아이프레임 reload
	video_if.click(function() {
		$('iframe').each(function() {
			$(this).attr('src', $(this).attr('src'));
		})
	})
	/*/kr/index*/
	
/* 메인페이지 동영상 테스트 */	
/*var video =  
	   '<div class="o_video o_main_video">' +
	        '<div class="o_thumb">' + 
	          '<video loop="loop"  autoplay playsinline muted src="http://hnbdesign.co.kr/wp-content/uploads/2021/05/ntopaz_720p_0517_2.mp4">' +
	            '<source src="http://hnbdesign.co.kr/wp-content/uploads/2021/05/ntopaz_720p_0517_2.mp4" type="video/mp4">' +
	          '</video>' +
	        '</div>' +
	'</div>';
	console.log(video)
if ( window.location.pathname == '/kr/index') { 

	 $('#wrap #seoul-gnb').after(video) 
	  $('.l-global').addClass('test')
	 $('.l-nav').addClass('test1')
	 console.log('asdasd') 
}*/
	//관심있어요 체크
	likeChk();
	//관심있어요 클릭시  by lyh
	$("#likeBtn").on("click",function(){
		
		
		var whatsonType = $(".whatsonType").val();
		var whatsonNo = $(".whatsonNo").val();
		var glolangType = $('input[name=glolangType]').val();
		var loginUrl = '';

		if(whatsonType == 'EVT'){
			loginUrl = "/"+$('#langStype').val()+"/login/login?retUrl=/"+$('#langStype').val()+"/whatson/event/detail?evtNo="+whatsonNo+"&glolangType="+glolangType;
		}
		if(whatsonType == 'EE'){
			loginUrl = "/"+$('#langStype').val()+"/login/login?retUrl=/"+$('#langStype').val()+"/whatson/education/detail?acadmyEeNo="+whatsonNo+"&glolangType="+glolangType;
		}
		if(whatsonType == 'EVT'){
			loginUrl = "/"+$('#langStype').val()+"/login/login?retUrl=/"+$('#langStype').val()+"/whatson/event/detail?evtNo="+whatsonNo+"&glolangType="+glolangType;
		}
		if(whatsonType == 'EXME'){
			loginUrl = "/"+$('#langStype').val()+"/login/login?retUrl=/"+$('#langStype').val()+"/whatson/series/detail?exNo="+whatsonNo+"&glolangType="+glolangType;
		}
		if(whatsonType == 'EXPC'){
			loginUrl = "/"+$('#langStype').val()+"/login/login?retUrl=/"+$('#langStype').val()+"/whatson/seoulpicture/detail?exNo="+whatsonNo+"&glolangType="+glolangType;
		}
		if(whatsonType == 'EX'){
			loginUrl = "/"+$('#langStype').val()+"/login/login?retUrl=/"+$('#langStype').val()+"/whatson/exhibition/detail?exNo="+whatsonNo+"&glolangType="+glolangType;
		}
		if(whatsonType == 'EXOU'){
			loginUrl = "/"+$('#langStype').val()+"/login/login?retUrl=/"+$('#langStype').val()+"/whatson/outdoor/detail?exNo="+whatsonNo+"&glolangType="+glolangType;
		}
		
		//로그인 체크
		$.ajax({
			url:'/login/loginChk', 
			data: {},
			type:'POST',
			dataType:'json',
			success: function(data) {
				var result = data.result;
				if(result){
					var url = '';
					if($('#likeBtn').hasClass('i-button_icon_bk') == true){
						//체크되어있으면 체크 해체
						url = '/common/deleteLike';
					}else{
						//체크되어 있지 않으면 체크 
						url = '/common/insertLike';
					}
						$.ajax({
							url:url, 
							data: { 'whatsonNo': whatsonNo, 
									'whatsonType' : whatsonType},
							type:'POST',
							dataType:'json',
							success: function(data) {
										
									if(data.resultCode == 0){
										//이미 관심있어요가 체크 되어있었다면
										if($('#likeBtn').hasClass('i-button_icon_bk') == true){
											$('#likeBtn').removeClass('i-button_icon_bk');
												$('#likeBtn').addClass('modal-open');
										}else{
										//관심있어요를 눌렀다면
												$('#likeBtn').addClass('i-button_icon_bk');
											$('#likeBtn').removeClass('modal-open');
										}
									}				
								},
								error:function(request,status,error){
								    alert("code:"+request.status+"\n"+"message:"+request.responseText+"\n"+"error:"+error);
								}
							});
					}else{
						alert("관람전시는 로그인 사용자만 가능합니다.로그인을 해주세요.");
						document.location.href=loginUrl;
						
					}
			},
			error:function(request,status,error){
			    alert("code:"+request.status+"\n"+"message:"+request.responseText+"\n"+"error:"+error);
			}
		});

	});
	
	//관심있어요 점수 클릭시 by lyh
	$(".likeBtn").on("click",function(){
		var score = $(this).data("score");
		var no = $(".whatsonNo").val();
		var type= $('.whatsonType').val();
		$.ajax({
			url:'/common/updateLikeScore', 
			data: { 'no': no, 
					'score': score,
					'type' : type},
			type:'POST',
			dataType:'json',
			success: function(data) {
				alert("점수가 반영되었습니다.");
			},
			error:function(request,status,error){
			    alert("code:"+request.status+"\n"+"message:"+request.responseText+"\n"+"error:"+error);
			}
		});
	});
	//마이페이지 관심있어요 삭제
	$('body').on('click', '#likeDeleteBtn', function(e) {
		var whatsonNo = $(this).data('no');
		$.ajax({
			url:'/common/deleteLike', 
			data: {'whatsonNo': whatsonNo},
			type:'POST',
			dataType:'json',
			success: function(data) {	
				if(data.resultCode == 0){
					$('#whatson'+whatsonNo).remove();
				}
			},
			error:function(request,status,error){
			    alert("code:"+request.status+"\n"+"message:"+request.responseText+"\n"+"error:"+error);
			}
		});
		
	});
});

	// 새창 팦업
	function openPopupWebite(url){
		
		window.open(url, "_blank", "toolbar=yes,scrollbars=yes,resizable=yes,top=100,left=100,width=1200,height=1200");
		
	}
	
	// 빈값체크
	function isBlank(value){
		if(value === null || value === '' || value === 0 || value === undefined) {
			return true;
		}else{
			return false;
		}
	}
	
	// 음성 재생시 로그 쌓기(2021.11.17)
	function insertVoiceLog(option){
		
		var formData = {
			exCd : option.exCd || '',				//전시코드
			exNm : option.exNm || '',				//전시명
			placeCd : option.placeCd || '',			//장소코드
			flagCd : option.flagCd || '',			//통계분류코드
			workNm : option.workNm || '',			//작품명
			statFlag : option.statFlag || "VOICE"	//기기접속
		};
		
		$.ajax({
			method: 'POST',
			url: '/common/insertVoiceLog', 
			data: $.param(formData, true)
		}).done(function(respdata) {
			if(respdata.status == "0"){
				console.log("음성재생로그 성공!!!")
			} else if(respdata.status == "9"){
				console.log("음성재생로그 실패!!!")
			}
		}).fail(function(e){
			console.error(e);
		});
	}

	//관심있어요 데이터확인  by lyh
	function likeChk(){
		var whatsonNo = $(".whatsonNo").val();
		
		$.ajax({
			url:'/common/chkLike', 
			data: { 'whatsonNo': whatsonNo},
			type:'POST',
			dataType:'json',
			success: function(data) {
				var chk = data.likeDomain.chk;
				if(chk >0){
					$("#likeBtn").addClass('i-button_icon_bk');
					$("#likeBtn").removeClass('modal-open');
				}
				
			},
			error:function(request,status,error){
			    alert("code:"+request.status+"\n"+"message:"+request.responseText+"\n"+"error:"+error);
			}
		});
		
		//	오디오 5초 앞,뒤 기능
		var audio = $('audio')[0];

		$('.o_audio_bk').click(function(){
			audio.currentTime -=5;
		})
		
		$('.o_audio_fr').click(function(){
			audio.currentTime +=5;
		})
	}