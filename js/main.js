// main.js
window.addEventListener("load", () => {

  function classon(index,list){
    for(let i=0; i<list.length;i++){
      list[i].classList.remove('on');
    }
    list[index].classList.add('on');
  }//양념장

  /// key info 클릭시 info box 노출
  // close 버튼 클릭시 box 닫힘
  const infoBtn = document.querySelector(".info_list>a");
  const infoBox = document.querySelector(".info_box");
  const clseBtn = document.querySelector(".info_box>a");
  const infos = document.querySelectorAll(".info_inner>div");
  const infowrap = document.querySelector(".infowrap");

  infoBtn.addEventListener("click", () => {// key info 버튼 클릭
    infoBox.classList.add("on");
    for(let el of infos){
      el.classList.add("on");
      infowrap.classList.add("on");
    }
    if(VW<768){
      body.style.overflow = 'hidden';
    }
  })

  clseBtn.addEventListener("click", () => {// close 버튼 클릭
    infoBox.classList.remove("on");
    for(let el of infos){
      el.classList.remove("on");
      infowrap.classList.remove("on");
    }
    if(VW<768){
      body.style.overflow = 'auto';
    }
  })

  /// info1 백그라운드
  const info1lis = document.querySelectorAll(".info1>ul>li");
  for(let i=0; i<info1lis.length; i++){
    info1lis[i].style.background = `url(../img/tb${i+1}.jpg) no-repeat 0 0`;
    info1lis[i].style.backgroundPosition = 'center';
    info1lis[i].style.backgroundSize = 'cover';
    info1lis[i].style.backgroundSize = '100%';

    info1lis[i].addEventListener("mouseenter", e => {
      e.currentTarget.style.backgroundSize = '120%';
    })
    info1lis[i].addEventListener("mouseleave", () => {
      info1lis[i].style.backgroundSize = '100%';
    })
  }

  /// info4 백그라운드 이미지 삽입
  const info4lis = document.querySelectorAll(".info4>ul>li>a>span");

  for(let i=0; i<info4lis.length; i++){
    info4lis[i].style.background = `url(../img/i${i+1}.png) no-repeat 0 0`
    info4lis[i].style.backgroundSize = 'cover';
  }

  ///gnb li 마우스 올리면 흰 배경 내려옴
  // '' 하위 li 차례대로 내려옴
  const header = document.querySelector("#header");
  const gnbli = document.querySelectorAll(".gnb>ul>li");

  for(let l=0; l<gnbli.length-1; l++){
    gnbli[l].addEventListener("mouseover", () => {
      header.classList.add("on");
      gnbli[l].querySelector("div").classList.add("on");
    })
    gnbli[l].addEventListener("mouseleave", () =>{
      header.classList.remove("on");
      gnbli[l].querySelector("div").classList.remove("on");
    })
  }

  // gnb 하위 li에 마우스 올리면 파란배경
  const gnb__li = document.querySelectorAll(".gnb>ul>li>div>ul>li")

  for(let i=0; i<gnb__li.length; i++){
    gnb__li[i].addEventListener("mouseover", e => {
      e.currentTarget.classList.add("on");
    })
    gnb__li[i].addEventListener("mouseleave", e => {
      e.currentTarget.classList.remove("on");
    })
  }

  /// 탑메뉴 KOR 클릭시 리스트 내려옴
  const KOR = document.querySelector(".topMenu>dl>dd:nth-of-type(2)");
  const lang = document.querySelector(".topMenu>dl>dd>ul");

  KOR.addEventListener("click", () => {//KOR 클릭
    if(lang.classList.contains("on")){
      lang.classList.remove("on");
      KOR.querySelector("i").setAttribute('class','fa-solid fa-angle-down');
    }else{
      lang.classList.add("on")
      KOR.querySelector("i").setAttribute('class','fa-solid fa-angle-up');
    }
  })

  /// srch 버튼 클릭 시 srch 박스 노출
  // srch inner on
  const srchBtn = document.querySelector(".topMenu>a");
  const srchBox = document.querySelector("#srch");

  srchBtn.addEventListener("click", e =>{
    srchBox.classList.toggle("on");
    srchBtn.classList.toggle("on");

  })


  /// a 클릭 시 브라우저창 위로 안 올라오도록
  const ahref = document.querySelectorAll("a");

  for(let el of ahref){
    el.addEventListener("click", e =>{
      e.preventDefault();
    })
  }

  /// auto banner
  const btnprev = document.querySelector(".banner_bar>.prevBtn");
  const btnnext = document.querySelector(".banner_bar>.nextBtn");
  const autobanner = document.querySelector(".auto_banner>ul");
  const autoBanners = document.querySelectorAll(".auto_banner>ul li");
  const bnbar = document.querySelectorAll(".banner_bar>div");

  let bnNum = 0;
  let bnCount = autoBanners.length;
  makeClone();
  init();
  setIndicators();

  function makeClone(){
    let firstClone = autobanner.children[0].cloneNode(true);
    let lastClone = autobanner.lastElementChild.cloneNode(true);
    autobanner.append(firstClone); //첫번째 배너 복사
    autobanner.insertBefore(lastClone, autobanner.children[0]); //마지막 배너 복사
  }
  function init(){
    autobanner.style.width = 67.86 * (bnCount + 2) + "vw";
    autobanner.style.transform = `translateX(-${67.86}vw)`;
  };

  // 오토배너 배너 바
  function setIndicators() {
    bnbar.forEach((index) =>{
      index.classList.remove("on");
    });
    bnbar[bnNum].classList.add("on");
  }

  // 오토배너 이전,다음 버튼
  btnnext.addEventListener("click", e => {
    e.preventDefault();
    if(bnNum<=bnCount-1){
      autobanner.style.transform = `translateX(${-(bnNum+2) * 67.86}vw)`;
      autobanner.style.transition = 'transform .5s ease-out';
    }
    if(bnNum === bnCount-1){//마지막 배너일 때
      setTimeout(() =>{
        autobanner.style.transform = 'translateX(-67.86vw)';
        autobanner.style.transition = 'transform 0s ease-out';
      }, 500);
      bnNum = -1;
    }
    bnNum ++;
    setIndicators();
  });

  btnprev.addEventListener("click", e => {
    e.preventDefault();
    if(bnNum>=0){
    autobanner.style.transform = `translateX(${-bnNum * 67.86}vw)`;
    autobanner.style.transition = 'transform .5s ease-out';
    }
    if(bnNum === 0){//첫번째 배너일 때
      setTimeout(() =>{
        autobanner.style.transform = `translateX(${-bnCount * 67.86}vw)`;
        autobanner.style.transition = 'transform 0s ease-out'
      }, 500);
      bnNum = bnCount;
    }
    bnNum --;
    setIndicators();
  })

  // 자동 슬라이드
  window.addEventListener("resize", () =>{
    let bnW = autobanner.closest("div").clientWidth;
  })
  let lastBn = autoBanners.length-1;
  let autobn;
  function auto () {
    autobn = setTimeout(() =>{
      bnNum++;
      if(VW>768){
        autobanner.style.left = `-${bnNum*67.86}vw`;
      }else if(VW<768){
        autobanner.style.left = `-${bnNum*92}vw`;
      }
      if(bnNum>lastBn){
        bnNum = 0;
      }
      auto();
      setIndicators();
    },8000);
  }
  auto();



  /// esg banner 백그라운드 이미지
  ///esg banner 마우스 올리면 이미지 확대
  const esg = document.querySelectorAll(".esg_banner>.back_img>div");
  const esg_banner = document.querySelector(".esg_banner");

  for(let m=0; m<esg.length; m++){  
    esg[m].style.background = `url(../img/esg${m+1}.jpg) no-repeat center/cover`;
    esg[m].style.backgroundSize = '105%';
    esg[m].style.transition = 'background-size 0.3s ease-out';
    esg_banner.addEventListener("mouseenter",()=>{
      esg[m].style.backgroundSize = '110%';
    })
    esg_banner.addEventListener("mouseleave", ()=>{
      esg[m].style.backgroundSize = '105%';
    })
  }

  //esg banner 이전,다음 버튼 클릭
  //버튼 클릭 시 페이지 숫자 바뀜
  const esgbanner = document.querySelector(".esg_banner>.back_img");
  const prevBtn = document.querySelector(".esg_banner>.btns>.prevBtn");
  const nextBtn = document.querySelector(".esg_banner>.btns>.nextBtn");
  const esgnum = document.querySelector(".esg_banner>p>span:last-of-type");
  let esgtxt = esgnum.innerHTML;

  prevBtn.addEventListener("click", ()=>{
    esgbanner.style.transform = 'translateX(0)';
    esg_banner.classList.add("on");
    esgtxt = esgtxt.replace("2/2","1/2");
    esgnum.innerHTML = esgtxt;
  })
  nextBtn.addEventListener("click", ()=>{
    esgbanner.style.transform = 'translateX(-22vw)';
    esg_banner.classList.add("on");
    esg_banner.querySelector(".pg:last-of-type").classList.add("on");
    esgtxt = esgtxt.replace("1/2","2/2");
    esgnum.innerHTML = esgtxt;
  })

  ///business 마우스 올리면 영상 재생, 자세히&글자 올라옴,멈춤 버튼
  const bsnsVideos = document.querySelectorAll(".business>div>div");
  const esgP = document.querySelectorAll(".business>div>div>p");

  function videos(index,list){
    for(let i=0; i<list.length;i++){
      list[i].style.width = '22vw';
      list[i].querySelector("p").style.width = '14.5vw';
    }
    list[index].style.width = '44vw';
    list[index].querySelector("p").style.width = '17.6vw';
  }//mouseenter

  function videos_(list,width){
    for(let i=0; i<list.length; i++){
      list[i].style.width = width;
    }
  }//mouseleave


  // 창크기 조절시 business 마우스 이벤트 추가, 삭제
  let VW = window.innerWidth;

  function addEvent() { // 768px 이상 이벤트 추가
    for(let v=0; v<bsnsVideos.length; v++){
      bsnsVideos[v].addEventListener("mouseenter", e => {
        videos(v,bsnsVideos);
        e.currentTarget.querySelector("video").play();
        bsnsVideos[v].classList.add("on");
      });
      bsnsVideos[v].addEventListener("mouseleave", e => {
        videos_(bsnsVideos,'420px');
        bsnsVideos[v].querySelector("video").load();
        bsnsVideos[v].classList.remove("on");
        for(let el of esgP){
          el.style.width = '17.6vw';
        }
      });
    }
  }

  function removeEvent() { // 768px 미만 이벤트 삭제
    for(let v=0; v<bsnsVideos.length; v++){
      bsnsVideos[v].removeEventListener("mouseenter", e => {
        videos(v,bsnsVideos);
        e.currentTarget.querySelector("video").load();
        bsnsVideos[v].classList.add("on");
      });
      bsnsVideos[v].removeEventListener("mouseleave", e => {
        videos_(bsnsVideos,'420px');
        e.currentTarget.querySelector("video").load();
        bsnsVideos[v].classList.remove("on");
      });
    }
  }

  function resizing() {
    VW = window.innerWidth;
    if(VW>768){
      addEvent();
    } else{
      removeEvent();
    }
  }
  window.addEventListener("resize", resizing);
  resizing();


  ///activity 마우스 올리면 자세히&글자 올라옴
  const acts = document.querySelectorAll(".activity>div");

  for(let el of acts){
    el.addEventListener("mouseenter", e => {
      e.currentTarget.classList.add("on");
    })
    el.addEventListener("mouseleave", e => {
      e.currentTarget.classList.remove("on");
    })
  }

  //activity pause 버튼 누르면 동영상 멈춤
  const pseBtn = document.querySelector(".activity>div>.pauseBtn");
  const actVideo = document.querySelector(".activity>div>div>video");


  pseBtn.addEventListener("click", () => {
    if(pseBtn.classList.contains("on")){
      pseBtn.classList.remove("on");
      actVideo.play();
    }else{
      pseBtn.classList.add("on");
      actVideo.pause();
    }
  })

  ///newsroom cards 백그라운드 이미지
  const newsImg = document.querySelectorAll(".cards>ul>li");

  for(let c=0; c<newsImg.length; c++){
    newsImg[c].style.background = `url(../img/newsroom${c+1}.jpg) no-repeat center/cover`;
  }

  //newsroom 첫 li 클릭하면 변화
  const newsList = document.querySelectorAll(".news_list>ul>li");

  for(let i=0; i<newsList.length; i++){
    newsList[i].addEventListener("click", e => {
      classon(i,newsList);
    })
  }

  ///newsroom cards 마우스 올리면 카드 돌아감
  const cards = document.querySelectorAll(".news_wrap>.cards>ul>li");
  const backCards = document.querySelectorAll(".news_wrap>.back_cards>ul>li");

  for(let s=0; s<cards.length; s++){
    cards[s].addEventListener("mouseenter", e => {
      e.currentTarget.style.transform = 'perspective(800px) rotateY(180deg)';
      backCards[s].style.transform = 'rotateY(0)';
      e.currentTarget.style.zIndex = '0';
      backCards[s].style.zIndex = '1';
    })
    cards[s].addEventListener("mouseleave", e => {
      e.currentTarget.style.transform = 'perspective(800px) rotateY(0)';
      backCards[s].style.transform = 'rotateY(180deg)';
      e.currentTarget.style.zIndex = '1';
      backCards[s].style.zIndex = '0';
    })
  }
  //newsroom 이전,다음 버튼 누르면 카드 이동
  const newsPrev = document.querySelector(".news_wrap>.news_prev");
  const newsNext = document.querySelector(".news_wrap>.news_next");
  const cardsWrap = document.querySelector(".cards");
  const back_cardsWrap = document.querySelector(".back_cards");
  let newNum=0;
  const lastnewNum = 8; 
  const lisWidth = 25.9;

  function slide(num) {
    cardsWrap.style.left = -num * 25.9 +"vw";
      back_cardsWrap.style.left = -num * 25.9 +"vw";
      newNum = num;
  }


  newsPrev.addEventListener("click", () => {
    if(newNum !== 0) slide(newNum - 1);
  });

  newsNext.addEventListener("click", () => {
    if(newNum !== 7) slide(newNum + 1)
  })

  ///network 첫 li 클릭하면 변화, 동시에 두번째 li 넘김
  const network2 = document.querySelectorAll(".network_content2>ul>li");
  const networkBar = document.querySelector(".network_bar");

  for(let i=0; i<network2.length; i++){
    network2[i].addEventListener("click", () => {
      classon(i,network2);
      networkBar.style.transform = `translate(-${i*28}vw)`;
    })
  }

  ///relation 아이콘 이미지
  const relImg = document.querySelectorAll(".relations>ul>li");

  for(let s=0; s<relImg.length; s++){
    relImg[s].style.background = `url(../img/investor${s+1}.png) no-repeat 92% 50%`;
  }


  ///footer 4번째 li 클릭시 하위 ul 노출, 트랜지션
  const footli_4 = document.querySelector(".foot_inner>ul>li:nth-of-type(4)");

  footli_4.addEventListener("click", ()=>{
    footli_4.classList.toggle("on");
  })

  ///footer Related Sites 클릭시 div 노출, 트랜지션
  const related = document.querySelector(".foot_list>a");
  const siteLi = document.querySelector(".foot_list>div");

  related.addEventListener("click", ()=>{
    related.classList.toggle("on");
    siteLi.classList.toggle("on");
  })





  /* pc 스크롤 이벤트 */
  let scll = document.documentElement.scrollTop || 0;

  window.addEventListener("scroll", () =>{//1024이하는 600스크롤 후 이벤트 발생, 1025이상은 200스크롤 후 이벤트 발생
    let scroll = document.documentElement.scrollTop;
    if(VW>1024 && scroll>=200){
      header.classList.add("scrll");
    }
    if(VW<=1024 && scroll>=600){
      header.classList.add("scrll");
    }
    if(scroll<200 || scroll<scll ){
      header.classList.remove("scrll");
    }
    scll = scroll;
  })






  /* 태블릿~모바일 aside */

  // aside 버튼 클릭 시 aside 노출
  const asideBtn = document.querySelector(".aside_btn")
  const aside = document.querySelector(".mob")
  const body = document.querySelector("body")

  asideBtn.addEventListener("click", e =>{
    e.preventDefault();
    asideBtn.classList.toggle("active");
    aside.classList.toggle("on");
    body.classList.toggle("scller");
  })

  // li 클릭 시 하위 li 노출
  const asideli = document.querySelectorAll(".mob_gnb>ul>li")
  const aside__li = document.querySelectorAll(".mob_gnb>ul>li>div")

  for(let i=0; i<asideli.length; i++){
    asideli[i].addEventListener("click", () => {
      asideli[i].classList.toggle("on");
      aside__li[i].classList.toggle("on");
    })
  }




  /* sub1 */

  ///sub1 content2 백그라운드 이미지
  const sub1Li = document.querySelectorAll(".content2>ul>li");

  for(let i=0; i<sub1Li.length; i++){
    sub1Li[i].style.background = `url(../img/linkbtm_0${i+1}.png) no-repeat 93% 50%`;
  }

  //table 페이지 숫자 클릭 이벤트
  //table 맨앞,맨뒤,이전,다음 버튼
  const firstPg = document.querySelector(".firstPg");
  const prevPg = document.querySelector(".prevPg");
  const nextPg = document.querySelector(".nextPg");
  const lastPg = document.querySelector(".lastPg");


  const tbLi = document.querySelectorAll(".page>ol>li");
  let olNum = 0; //리스트 번호
  let lastolNum = tbLi.length-1; //마지막 리스트 번호

  for(let i=0; i<tbLi.length; i++){
    tbLi[i].addEventListener("click", e => {//각각의 숫자
      e.preventDefault();
      classon(i,tbLi);
    })


    firstPg.addEventListener("click" , e => {//맨앞으로
      e.preventDefault();
      classon(olNum,tbLi);
    })

    lastPg.addEventListener("click", e => {//맨뒤로
      e.preventDefault();
      classon(lastolNum,tbLi);
    })

    prevPg.addEventListener("click", e => {//이전
      e.preventDefault();
      classon(i,tbLi);
      olNum--;
      if(olNum<0){
        olNum=lastolNum;
        classon(i,tbLi);
      }
    })

    nextPg.addEventListener("click", e => {//다음
      e.preventDefault();
      classon(i,tbLi);
      olNum--;
      if(olNum>lastolNum){
        olNum=0;
        classon(i,tbLi);
      }
    })
  }
})