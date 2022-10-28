import React from 'react'
import './TextScroll.css'


function TextScroll() {

    let scrollY = 0; //Y축 값
    let prevScrollHeight = 0; //현재 스크롤 위치보다 이전에 위치한 스크롤 높이 값의 합
    let currentScene = 0; //현재 활성화 된 섹션
    let enterNewScene = false;  //새로운 섹션이 들어오면 true

    const sceneInfo = [
        {
            //section 0
            type: 'sticky',
            heightNum: 5,   //브라우저의 높이의 5배로 scrollHeight 셋팅
            scrollHeight: 0,
            objs: {
                container : document.getElementById('scroll_section_0'),
                msg1 : document.getElementById('section_0_1'),
                msg2 : document.getElementById('section_0_2'),
                msg3 : document.getElementById('section_0_3'),
                msg4 : document.getElementById('section_0_4'),
            },
            values : {
                
                msg1_opacity_in : [0, 1, {start: 0.1, end: 0.2}],
                msg1_opacity_out : [1, 0, {start: 0.25, end: 0.3}],

                msg1_translateY_in : [20, 0, {start: 0.1, end:0.2}],
                msg1_translateY_out : [0, -20, {start: 0.25, end: 0.3}],

                msg2_opacity_in : [0, 1, { start: 0.3, end: 0.4 }],
                msg2_opacity_out : [1, 0, { start: 0.45, end: 0.5 }],
				msg2_translateY_in : [20, 0, { start: 0.3, end: 0.4 }],
                msg2_translateY_out : [0, -20, { start: 0.45, end: 0.5 }],
				 
                msg3_opacity_in : [0, 1, { start: 0.5, end: 0.6 }],
                msg3_opacity_out : [1, 0, { start: 0.65, end: 0.7 }],
                msg3_translateY_in : [20, 0, { start: 0.5, end: 0.6 }],
                msg3_translateY_out : [0, -20, { start: 0.65, end: 0.7 }],
				
				msg4_opacity_in : [0, 1, { start: 0.7, end: 0.8 }],
                msg4_opacity_out : [1, 0, { start: 0.85, end: 0.9 }],
				msg4_translateY_in : [20, 0, { start: 0.7, end: 0.8 }],
                msg4_translateY_out : [0, -20, { start: 0.85, end: 0.9 }],
            },

        },
        {
            //section 1
            type: 'normal',
            heightNum: 5,   //브라우저의 높이의 5배로 scrollHeight 셋팅
            scrollHeight: 0,
            objs: {
                container : document.getElementById('scroll_section_1')
            }
        },
        {
            //section 2
            type: 'sticky',
            heightNum: 5,   //브라우저의 높이의 5배로 scrollHeight 셋팅
            scrollHeight: 0,
            objs: {
                container : document.getElementById('scroll_section_2'),
                msg1 : document.getElementById('section_2_1'),
                msg2 : document.getElementById('section_2_2'),
                msg3 : document.getElementById('section_2_3'),
                pin2 : document.getElementById('pin2'),
                pin3 : document.getElementById('pin3'),
            },
            values : {

                msg1_opacity_in : [0, 1, { start: 0.15, end: 0.2 }],
                msg1_opacity_out : [1, 0, { start: 0.3, end: 0.35 }],
                msg1_translateY_in : [20, 0, { start: 0.15, end: 0.2 }],
                msg1_translateY_out : [0, -20, { start: 0.3, end: 0.35 }],

                msg2_opacity_in : [0, 1, { start: 0.5, end: 0.55 }],
                msg2_opacity_out : [1, 0, { start: 0.58, end: 0.63 }],
                msg2_translateY_in : [30, 0, { start: 0.5, end: 0.55 }],
                msg2_translateY_out : [0, -20, { start: 0.58, end: 0.63 }],

                msg3_opacity_in : [0, 1, { start: 0.72, end: 0.77 }],
                msg3_opacity_out : [1, 0, { start: 0.85, end: 0.9 }],
                msg3_translateY_in : [30, 0, { start: 0.72, end: 0.77 }],
                msg3_translateY_out : [0, -20, { start: 0.85, end: 0.9 }],
                
                pin2_scaleY : [0.5, 1, { start: 0.5, end: 0.55 }],
                pin2_opacity_in: [0, 1, { start: 0.5, end: 0.55 }],
                pin2_opacity_out: [1, 0, { start: 0.58, end: 0.63 }],
				
				pin3_scaleY: [0.5, 1, { start: 0.72, end: 0.77 }],
				pin3_opacity_in: [0, 1, { start: 0.72, end: 0.77 }],
				pin3_opacity_out: [1, 0, { start: 0.85, end: 0.9 }]
            },
        },
        {
            //section 3
            type: 'sticky',
            heightNum: 5,   //브라우저의 높이의 5배로 scrollHeight 셋팅
            scrollHeight: 0,
            objs: {
                container : document.getElementById('scroll_section_3')
            }

        },
    ]

    //섹션의 스크롤 높이 셋팅
    const setLayout = () => {
        
        for(let item of sceneInfo) {
            
            if(item.type === 'sticky') {
                item.scrollHeight = item.heightNum * window.innerHeight
                
            } else if (item.type === 'normal') {
                item.scrollHeight = item.objs.container.offsetHeight
            }
            
            item.objs.container.style.height = `${item.scrollHeight}px`
        }

        let totalScrollHeight = 0;
        scrollY = window.scrollY
        for(let i=0; i<sceneInfo.length; i++ ) {
            totalScrollHeight += sceneInfo[i].scrollHeight;
            if(totalScrollHeight >= scrollY) {
                currentScene = i;
                break;
            }
        }
        console.log('currentScene : ', currentScene)
        document.body.setAttribute('id', `show_scene_${currentScene}`)
    }

    
    const playAnimation = () => {

        const objs = sceneInfo[currentScene].objs
        const values = sceneInfo[currentScene].values

        const currentY = scrollY - prevScrollHeight

        //현재 씬의 스크롤 높이
        const scrollHeight = sceneInfo[currentScene].scrollHeight;
        const scrollRatio = currentY / scrollHeight

        calcValues(values.msg1_opacity_in, currentY)

        switch(currentScene) {
            case 0:

                if(scrollRatio <= 0.22) {
                    //in
                    objs.msg1.style.opacity = calcValues(values.msg1_opacity_in, currentY)    ;
                    objs.msg1.style.transform = `translateY(${calcValues(values.msg1_translateY_in, currentY)}%)`
                } else {
                    //out
                    objs.msg1.style.opacity = calcValues(values.msg1_opacity_out, currentY);
                    objs.msg1.style.transform = `translateY(${calcValues(values.msg1_translateY_out, currentY)}%)`
                }
                
                if (scrollRatio <= 0.42) {
					// in
					objs.msg2.style.opacity = calcValues(values.msg2_opacity_in, currentY);
					objs.msg2.style.transform = `translate3d(0, ${calcValues(values.msg2_translateY_in, currentY)}%, 0)`;
				} else {
					// out
					objs.msg2.style.opacity = calcValues(values.msg2_opacity_out, currentY);
					objs.msg2.style.transform = `translate3d(0, ${calcValues(values.msg2_translateY_out, currentY)}%, 0)`;
				}

                if (scrollRatio <= 0.62) {
					// in
					objs.msg3.style.opacity = calcValues(values.msg3_opacity_in, currentY);
					objs.msg3.style.transform = `translate3d(0, ${calcValues(values.msg3_translateY_in, currentY)}%, 0)`;
				} else {
					// out
					objs.msg3.style.opacity = calcValues(values.msg3_opacity_out, currentY);
					objs.msg3.style.transform = `translate3d(0, ${calcValues(values.msg3_translateY_out, currentY)}%, 0)`;
				}

                if (scrollRatio <= 0.82) {
					// in
					objs.msg4.style.opacity = calcValues(values.msg4_opacity_in, currentY);
					objs.msg4.style.transform = `translate3d(0, ${calcValues(values.msg4_translateY_in, currentY)}%, 0)`;
				} else {
					// out
					objs.msg4.style.opacity = calcValues(values.msg4_opacity_out, currentY);
					objs.msg4.style.transform = `translate3d(0, ${calcValues(values.msg4_translateY_out, currentY)}%, 0)`;
				}
                break
  
            case 2:
                if (scrollRatio <= 0.25) {
                    // in
                    objs.msg1.style.opacity = calcValues(values.msg1_opacity_in, currentY);
                    objs.msg1.style.transform = `translate3d(0, ${calcValues(values.msg1_translateY_in, currentY)}%, 0)`;
                } else {
                    // out
                    objs.msg1.style.opacity = calcValues(values.msg1_opacity_out, currentY);
                    objs.msg1.style.transform = `translate3d(0, ${calcValues(values.msg1_translateY_out, currentY)}%, 0)`;
                }
    
                if (scrollRatio <= 0.57) {
                    // in
                    objs.msg2.style.transform = `translate3d(0, ${calcValues(values.msg2_translateY_in, currentY)}%, 0)`;
                    objs.msg2.style.opacity = calcValues(values.msg2_opacity_in, currentY);
                    objs.pin2.style.transform = `scaleY(${calcValues(values.pin2_scaleY, currentY)})`;
                } else {
                    // out
                    objs.msg2.style.transform = `translate3d(0, ${calcValues(values.msg2_translateY_out, currentY)}%, 0)`;
                    objs.msg2.style.opacity = calcValues(values.msg2_opacity_out, currentY);
                    objs.pin2.style.transform = `scaleY(${calcValues(values.pin2_scaleY, currentY)})`;
                }
    
                if (scrollRatio <= 0.83) {
                    // in
                    objs.msg3.style.transform = `translate3d(0, ${calcValues(values.msg3_translateY_in, currentY)}%, 0)`;
                    objs.msg3.style.opacity = calcValues(values.msg3_opacity_in, currentY);
                    objs.pin3.style.transform = `scaleY(${calcValues(values.pin3_scaleY, currentY)})`;
                } else {
                    // out
                    objs.msg3.style.transform = `translate3d(0, ${calcValues(values.msg3_translateY_out, currentY)}%, 0)`;
                    objs.msg3.style.opacity = calcValues(values.msg3_opacity_out, currentY);
                    objs.pin3.style.transform = `scaleY(${calcValues(values.pin3_scaleY, currentY)})`;
                }
    


                break
                
            case 3:
                break
        }
        
    }

    const calcValues = (values, currentY) => {

        let rv = 0;

        //현재 스크롤에서 스크롤된 비율 

        const scrollY = sceneInfo[currentScene].scrollHeight;
        const scrollRatio = currentY / scrollY;
        
        if(values.length === 3) {
            //start ~ end 사이에 애니메이션 실행
            const partScrollStart = values[2].start * scrollY;
            const partScrollEnd = values[2].end * scrollY;
            const partScrollY = partScrollEnd - partScrollStart;

            // console.log('partScrollEnd : ', partScrollEnd)
            // console.log(values)

            if(currentY >= partScrollStart && currentY <= partScrollEnd) {
                rv = (currentY - partScrollStart) / partScrollY * (values[1] - values[0]) + values[0];
            } else if (currentY < partScrollStart) {
                rv = values[0];
            } else if (currentY > partScrollEnd) {
                rv = values[1];
            }

        } else {
            rv = scrollRatio * (values[1] - values[0]) + values[0];
        }

        return rv
    }

    
    const scrollLoop = () => {
        enterNewScene = false;
        prevScrollHeight = 0;

        for(let i=0; i<currentScene; i++) {
            prevScrollHeight += sceneInfo[i].scrollHeight
        }
        
        if(scrollY > (prevScrollHeight+sceneInfo[currentScene].scrollHeight)) {
            enterNewScene = true
            currentScene++;
            document.body.setAttribute('id', `show_scene_${currentScene}`)
        } 

        if(scrollY < prevScrollHeight) {
            enterNewScene = true;
            if(currentScene === 0) return;
            currentScene--;
            document.body.setAttribute('id', `show_scene_${currentScene}`);
        }
        
        if(enterNewScene) return;
        playAnimation();
    }


    //창이 바뀌면 높이를 다시 계산
    
    window.addEventListener('scroll', ()=> {
        scrollY = window.scrollY
        scrollLoop()
    })
    
    window.addEventListener('resize', setLayout)
    window.addEventListener('load', setLayout)
    

    return (
        <div>
            <nav className="global-nav">
                <div className="global-nav-links">
                    <a href="#" className="global-nav-item">Rooms</a>
                    <a href="#" className="global-nav-item">Ideas</a>
                    <a href="#" className="global-nav-item">Stores</a>
                    <a href="#" className="global-nav-item">Contact</a>
                </div>
            </nav>
            <nav className="local-nav">
                <div className="local-nav-links">
                    <a href="#" className="product-name">AirMug Pro</a>
                    <a href="#">개요</a>
                    <a href="#">제품사양</a>
                    <a href="#">구입하기</a>
                </div>
            </nav>
            <section className="scroll-section" id="scroll_section_0">
                <h1>AirMug Pro</h1>
                <div className="sticky-elem main-message" id="section_0_1">
                    <p>온전히 빠져들게 하는 <br/>최고급 세라믹</p>
                </div>
                <div className="sticky-elem main-message" id="section_0_2">
                    <p>주변 맛을 느끼게 해주는<br/>주변 맛 허용 모드</p>
                </div>
                <div className="sticky-elem main-message" id="section_0_3">
                    <p>온종일 편안한<br/>맞춤형 손잡이</p>
                </div>
                <div className="sticky-elem main-message" id="section_0_4">
                    <p>새롭게 입가를<br/>찾아온 매혹</p>
                </div>
            </section>

            <section className="scroll-section" id="scroll_section_1">
                <p className="description">
                    <strong>보통 스크롤 영역</strong>
                    Lorem ipsum dolor sit amet consectetur adipisicing elit. Nostrum qui hic aliquid minima tempora iste
                    accusamus ad repellat dolorum ipsa!
                    Lorem ipsum dolor sit amet consectetur adipisicing elit. Maiores exercitationem aliquam repudiandae eligendi ea minus, fuga, harum mollitia sed ab dignissimos debitis quae ipsam distinctio eius aliquid tempore vel maxime.
                    Lorem ipsum dolor sit amet, consectetur adipisicing elit. Velit cupiditate libero repellat quasi ex. Ipsam assumenda eaque sunt vel officiis debitis alias reprehenderit distinctio, saepe natus ipsa. Obcaecati, in ab.
                    Lorem ipsum dolor sit amet consectetur adipisicing elit. Qui ut commodi sequi doloribus maxime quam repellendus unde placeat laborum excepturi sint, cumque voluptatum recusandae sit iure eveniet quaerat officia modi!
                </p>
            </section>
            <section className="scroll-section" id="scroll_section_2">
                <div className="sticky-elem main-message" id="section_2_1">
                    <p>
                        <small>편안한 촉감</small>
                        입과 하나 되다
                    </p>
                </div>
                <div className="sticky-elem desc-message" id="section_2_2">
                    <p>
                        편안한 목넘김을 완성하는 디테일한 여러 구성 요소들, 우리는 이를 하나하나 새롭게 살피고 재구성하는 과정을 거쳐 새로운 수준의 머그, AirMug Pro를 만들었습니다. 입에 뭔가
                        댔다는 감각은 어느새 사라지고 오롯이 당신과 음료만 남게 되죠.
                    </p>
                    <div className="pin" id="pin2"></div>
                </div>

                <div className="sticky-elem desc-message" id="section_2_3">
                    <p>
                        디자인 앤 퀄리티 오브 스웨덴,
                        <br />
                        메이드 인 차이나
                    </p>
                    <div className="pin" id="pin3"></div>
                </div>
            </section>

            <section className="scroll-section" id="scroll_section_3">
                <p className="mid-message">
                    <strong>Retina 머그</strong>
                    <br />
                    아이디어를 광활하게 펼칠
                    <br />
                    아름답고 부드러운 음료 공간.
                </p>
                <p className="canvas-caption">
                    Lorem ipsum dolor sit amet consectetur adipisicing elit. Voluptatibus at omnis harum, sint consequatur
                    labore hic quae tempora saepe debitis!
                    Lorem ipsum dolor, sit amet consectetur adipisicing elit. Quos sit incidunt iure voluptas corrupti earum obcaecati hic provident harum, quia, ab et unde ipsam totam. Eius saepe cumque deleniti eligendi.
                    Lorem ipsum dolor sit amet consectetur adipisicing elit. Ullam est, quidem veniam sunt expedita repellendus at numquam cum provident quia deserunt sint, quibusdam perferendis ut ipsa alias dolore nostrum illo
                </p>
            </section>

        </div>
    )
}

export default TextScroll