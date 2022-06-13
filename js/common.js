$(document).ready(function() {
    // 서브메뉴 이벤트
    var subMn = $('.sub_mn');
    subMn.hide();
    var leftMainMn = $('#l_main_mn li');
    var rightMainMn = $('#r_main_mn li');
    leftMainMn.hover(
        function() {
            $(this).css({borderBottom: '3px solid #fff'});
            $(this).find('.sub_mn').show();
        },
        function() {
            $(this).css({borderBottom: 0});
            $(this).find('.sub_mn').hide();
        }
    );
    rightMainMn.hover(
        function() {
            if($(this).index() == 1) {
                $(this).css({borderBottom: 0});
            }else {
                $(this).css({borderBottom: '3px solid #fff'});
            }
            $(this).find('.sub_mn').show();
        },
        function() {
            $(this).css({borderBottom: 0});
            $(this).find('.sub_mn').hide();
        }
    );

    // 박스오피스 이벤트
    var boxOffice = $('.boxOffice_img');

    boxOffice.hover(
        function() {
            $(this).find('.grade').css({opacity: 0}).stop().animate({opacity: 1}, 300);
        },
        function() {
            $(this).find('.grade').css({opacity: 1}).stop().animate({opacity: 0}, 300);
        }
    );

    $(function mouseEvent() {
        $('#ico_mouse').animate({paddingTop: '0px'}, 1000, null);
        $('#ico_mouse').animate({paddingTop: '12px'}, 500, null, mouseEvent).delay(1000);
    });

    // 이미지 슬라이드
    var sl1 = $('.img_s01 ul li');
    var sl2 = $('.img_s02 ul li');
    var bar = $('.slider_bar > span');
    var prev = $('.slider_con > .btn_prev');
    var next = $('.slider_con > .btn_next');
    var pause = $('.slider_con > .btn_pause');
    var play = $('.slider_con > .btn_play');
    var current = 0;
    var interval;

    // 자동실행
    function auto() {
        interval = setInterval(function() {
            var n = current + 1;

            if(n == 7) {
                n = 0;
            }
            move(n);
        }, 3000);
    }
    auto();

    // 버튼 클릭 시 자동실행 중지
    function moveStop() {
        clearInterval(interval);

        pause.css({display: 'none'});
        play.css({display: 'inline-block'});
    }
    
    prev.click(function() { // 이전 버튼
        moveStop();
        var prevNum = current - 1;
        $('.btn_next').css({opacity: 1});
        if(prevNum < 0) {
            $('.btn_prev').attr("disabled", true);
            current = 0;
        }else {
            $('.btn_prev').attr("disabled", false);
            move(prevNum);
        }
    });

    next.click(function() { // 다음 버튼
        moveStop();
        var nextNum = current + 1;
        $('.btn_prev').css({opacity: 1});
        if(nextNum > 6) {
            $('.btn_next').attr("disabled", true);
            current = 6;
        }else {
            $('.btn_next').attr("disabled", false);
            move(nextNum);
        }
    });

    pause.click(function() { // 정지
        moveStop();
    });

    play.click(function() { // 실행
        auto();

        pause.css({display: 'inline-block'});
        play.css({display: 'none'});
    });

    function move(i) {
        var sl1CurrentEl = sl1.eq(current);
        var sl1NextEl = sl1.eq(i);
        var sl2CurrentEl = sl2.eq(current);
        var sl2NextEl = sl2.eq(i);

        bar.removeClass('on');
        bar.eq(i).addClass('on');

        sl1CurrentEl.css({top: 0, opacity: 1}).stop().animate({top: '-230px', opacity: 0});
        sl1NextEl.css({top: '230px', opacity: 0}).stop().animate({top: 0, opacity: 1});

        sl2CurrentEl.css({left: 0, opacity: 1}).stop().animate({left: '-100%', opacity: 0});
        sl2NextEl.css({left: '100%', opacity: 0}).stop().animate({left: 0, opacity: 1});

        current = i;

        $('.slider_num').text(`${i + 1}/7`);
    }
    
    // 상단 메뉴 버튼들 이벤트 (사이트맵, 검색, 마이메가)
    var sitemap = $('#sitemap_btn');
    var srch = $('#srch_btn');
    var mymega = $('#mymega_btn');

    // 0일 경우 닫힌 상태, 1일 경우 열린 상태
    var sitemap_state = 0;
    var srch_state = 0;
    var mymega_state = 0;

    // 사이트맵 이벤트
    sitemap.click(function() {
        if(sitemap_state == 0) {
            $('#sitemap').css({display: 'block'});
            $(this).find('img').attr('src','./images/btn-header-layer-close.png');
            sitemap_state = 1;
        }else {
            $('#sitemap').css({display: 'none'});
            $(this).find('img').attr('src','./images/ico-sitemap-white.png');
            sitemap_state = 0;
        }
        srch_state = 0;
        mymega_state = 0;
        $('#search').css({display: 'none'});
        srch.find('img').attr('src','./images/ico-search.png');
        $('#mymega').css({display: 'none'});
        mymega.find('img').attr('src','./images/ico-mymega.png');
    });

    // 검색 이벤트
    srch.click(function() {
        if(srch_state == 0) {
            $('#search').css({display: 'block'});
            $(this).find('img').attr('src','./images/btn-header-layer-close.png');
            srch_state = 1;
        }else {
            $('#search').css({display: 'none'});
            $(this).find('img').attr('src','./images/ico-search.png');
            srch_state = 0;
        }
        sitemap_state = 0;
        mymega_state = 0;
        $('#sitemap').css({display: 'none'});
        sitemap.find('img').attr('src','./images/ico-sitemap-white.png');
        $('#mymega').css({display: 'none'});
        mymega.find('img').attr('src','./images/ico-mymega.png');
    });

    $('.srch_choice li').click(function() {
        var i = $(this).index();
        $('.srch_choice li').removeClass('choice_on');
        if(i == 0) {
            $('.srch_div01').show();
            $('.srch_div02').hide();
                    
        }else {
            $('.srch_div01').hide();
            $('.srch_div02').show();
        }
        $(this).addClass('choice_on');
    });
    var rankImg01 = $('.srch_div01 .srch_rank_img li');
    var rankTitle01 = $('.srch_div01 .srch_rank_title li');
    var rankImg02 = $('.srch_div02 .srch_rank_img li');
    var rankTitle02 = $('.srch_div02 .srch_rank_title li');
    rankTitle01.mouseenter(function() {
        var i = $(this).index();
        var j = rankImg01.eq(i);
        rankImg01.hide();
        j.show();
    });
    rankTitle02.mouseenter(function() {
        var i = $(this).index();
        var j = rankImg02.eq(i);
        rankImg02.hide();
        j.show();
    });

    // 마이메가 이벤트
    mymega.click(function() {
        if(mymega_state == 0) {
            $('#mymega').css({display: 'block'});
            $(this).find('img').attr('src','./images/btn-header-layer-close.png');
            mymega_state = 1;
        }else {
            $('#mymega').css({display: 'none'});
            $(this).find('img').attr('src','./images/ico-mymega.png');
            mymega_state = 0;
        }
        srch_state = 0;
        sitemap_state = 0;
        $('#search').css({display: 'none'});
        srch.find('img').attr('src','./images/ico-search.png');
        $('#sitemap').css({display: 'none'});
        sitemap.find('img').attr('src','./images/ico-sitemap-white.png');
    });

    // 로그인 모달창 이벤트
    var modalBg = $('#modal_bg');
    var modalPop = $('#modal_login');
    var modalState = 0; // 0일 때 닫힘, 1일 때 열림
    $('.login_go').click(function() {
        modalBg.show();
        modalPop.show();
        $('html').addClass('modalOn');

        $('#mymega').css({display: 'none'});
        mymega.find('img').attr('src','./images/ico-mymega.png');
        mymega_state = 0;
        modalState = 1;
    });
    $('.pop_close').click(function() {
        modalBg.hide();
        modalPop.hide();
        $('html').removeClass('modalOn');
        modalState = 0;
    });

    // 로그인 유효성 검사
    var submitBtn = $('.submit_btn');
    
    $('.input_area input[name=id], .input_area input[name=pw]').on('input', function() { // 아이디와 비밀번호가 들어와야 로그인 버튼 활성화
        var id = $('.input_area input[name=id]').val();
        var pw = $('.input_area input[name=pw]').val();

        if(id != '' && pw != '') {
            submitBtn.attr("disabled", false);
            submitBtn.css({backgroundColor: "#503396", color: "#fff", cursor: "pointer"});
        }else {
            submitBtn.attr("disabled", true);
            submitBtn.css({backgroundColor: "#E0E0E0", color: "#777777", cursor: "default"});
        }
    });

});