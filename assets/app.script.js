// 앱 연동을 위한 스크립트 모음 (kskang)
var currentOS;

$(document).ready(function(){
	// UserAgent Check CurrentOS
	// Custom User Agent에서 정의된 값이 있으면 Native라고 인식함
	// 안드로이드 : sema_android
	// 아이폰     : sema_iphone 
	var mobile = (/iphone|ipad|ipod|android/i.test(navigator.userAgent.toLowerCase()));
	if (mobile) {
		// 유저에이전트를 불러와서 OS를 구분합니다.
		var userAgent = navigator.userAgent.toLowerCase();
		if (userAgent.search("sema_android") > -1)
		{
			currentOS = "android"; //안드로이드 Native
			$("body").addClass("is-app");
		}
		else if ((userAgent.search("sema_iphone") > -1))
		{
			currentOS = "ios"; //아이폰 Native
			$("body").addClass("is-app");
		}
		else
		{
			currentOS = "else"; //디바이스의 모바일 브라우져
		}
		//$("body").addClass("is-app");
	} else {
		// 모바일이 아닐 때
		currentOS = "nomobile";
	}
	console.log("currentOS : " + currentOS);
});

function currentOsSearch(){
	alert(currentOS);
}

// UserAgent
function printUserAgent() {
	var yourInfo = "User-agent header sent: " + navigator.userAgent;
	alert(yourInfo);
	console.log(yourInfo);
}

//<!-- Language -->
// App함수 : APP_CurrentLanguage()
// Web함수 : WEB_CurrentLanguage(언어)
// ko : 한국어 
// en : 영어 포함 기타언어
// 웹에서 언어요청이 필요할때 'APP_CurrentLanguage' 호출하면 앱에서 'WEB_CurrentLanguage' 로 현재언어값을 웹으로 전달
// 앱의 환경설정에서 언어 변경시 WEB_CurrentLanguage 로 현재언어값을 웹으로 전달
function getNativeLanguage(){
	if(currentOS == "android"){
		currentLang = window.android.APP_CurrentLanguage();
	}else if(currentOS == "ios"){
		currentLang = webkit.messageHandlers.SeMA.postMessage('APP_CurrentLanguage');
	}
}
function WEB_CurrentLanguage(lang){
	alert(lang);
	console.log(lang);
}


//<!-- 환경설정 -->
// 앱의 환경설정 페이지 실행 
// App함수 : APP_GoNativeSetting()
function goNativeSetting(){
	if(currentOS == "android"){
		window.android.APP_GoNativeSetting();
	}else if(currentOS == "ios"){
		webkit.messageHandlers.SeMA.postMessage('APP_GoNativeSetting');
	}
}

//<!-- GPS -->
// App함수 : APP_GetGPSData()
// Web함수 : WEB_SetGPSData(위도, 경도)
// 웹에서 GPS 위치 정보가 필요할때 'APP_GetGPSData' 호출하면 앱에서 'WEB_SetGPSData' 로 GPS 위치 정보를 웹으로 전달
function getNativeGPSData(){
	if(currentOS == "android"){
		window.android.APP_GetGPSData();
	}else if(currentOS == "ios"){
		webkit.messageHandlers.SeMA.postMessage('APP_GetGPSData');
	}
}
function WEB_SetGPSData(lat, lng){
	alert("위도 : " + lat +  " 경도 : " +lng);
	console.log("위도 : " + lat +  " 경도 : " +lng);
}



//<!-- Beacon -->
// Web함수 : WEB_SetBeaconData(major, minor, rssi)
// 앱에서 비콘 신호 수신시 'WEB_SetBeaconData' 로 비콘정보를 웹으로 전달
// 중요: rssi 는 0 ~ -n 으로 전달, rssi 는 0에 근접할수록 가까운거리를 나타냄, 오류신호 필터링으로  if(rssi < 0 && rssi >= -90) 의 신호만 사용함.
function WEB_SetBeaconData(major, minor, rssi){
	let today = new Date();   
    beaconDiv.innerHTML = "(" + today + ") major : " + major +  ", minor : " +minor +  ", rssi : " +rssi;
    console.log("(" + today + ") major : " + major +  ", minor : " +minor +  ", rssi : " +rssi);
    
    
    
    if(rssi < 0 && rssi >= -90){
    // 1. 전시 id, major, minor, rssi
	    $.ajax({ 
	    	url: "/appBeacon",  //url
	    	type: "post", // 타입
	    	dataType:"json", //받아올 형태 지정 
	    	data : {major : major,
	    			minor : minor,
	    			rssi : rssi,
	    			currentOS : currentOS}, // 파라미터 데이터
	    	//data : $("#form1").serialize(), //파라미터형태로 전송할 경우
	    	success: function(data){       //성공시 data라는 변수에 리턴값이 매칭됨 오브젝트형으로 리턴시 개별 파싱해야됨 
	    		// 2. 넘어온 비콘 정보로 전시회 찾기 
	    	    var exNo = data.beaconDomain.exNo;
	    	    var audioGuideNo = data.beaconDomain.audioGuideNo
	    	    // 3. 찾으면 상세정보로 이동
	    	    alert("확인");
	    		window.open('/whatson/exhibition/detail?exNo='+exNo); //주소확정 후 
	    	   /* window.open('/whatson/exhibition/audio_guide?audioGuideNo='+audioGuideNo);*/
	    	},error: function (request, status, error) {
	    	   alert("에러"); 
	    	} 
	    });
    // 백그라운드에서 수신시 앱 활성화
    window.android.APP_GoNativeActivity();
    }
}


//<!-- 파라미터 -->
// Web함수 : WEB_SetQRData(param)
// 큐알 인식시 스키마 sema://docent?aaa=1&bbb=3에서 ? 뒤의 파라미터값을 그대로 WEB_SetQRData 함수로 전달합니다.
function WEB_SetQRData(param){
//		var arrParam = param.split('&');
//		var flag = arrParam[0];
//		var ex_id = arrParam[1];
//		var detail_ex_id = arrParam[2];
//		paramDiv.innerHTML = "파라미터 param : " + param + ", flag : " + flag + ", ex_id : " + ex_id + ", detail_ex_id : " + detail_ex_id;
	alert("파라미터 param : " + param);
	console.log("파라미터 param : " + param);
}


//<!-- 웹로그 -->
// App함수 : APP_SendAnalytics(path)
// 웹에서 현재화면의 경로를 앱으로 전달
// 데이터 형식은 json 을 스트링형식으로
// 안드로이드 >> 함수명(데이터)
// 아이폰 >> {action:함수명, data:데이터}
// 예) 소장품 검색의 경우 /collection/search, 소장품 목록의 경우 /collection/list
function sendAnalytics(){
	//var data = {path: "/collection/search"};
	var data = {path: "/"};
	
	if(currentOS == "android"){
		window.android.APP_SendAnalytics(JSON.stringify(data));
	}else if(currentOS == "ios"){
		webkit.messageHandlers.SeMA.postMessage(JSON.stringify({action:'APP_SendAnalytics', data: data}));
	}
	alert('통계 전송 완료');
	console.log('통계 전송 완료');
}