import { Component } from "react";
import React from "react";
import classes from "../components/Styles.module.css";
import { getURLandredirect } from "../helper/api";
import "../css/splash.css";
import donotpresslogo from "../assets/donotpresslogo.jpeg";
import slogo from "../assets/slogo.png";
import close from "../assets/close.png";
import logo from "../assets/logo.png";
import vdlogo from "../assets/videodarjee.jpg";
import new_logo from "../assets/Omni-logo.png";
import deetmelogo from "../assets/deet-me-logo.png";
import deetLogo from "../assets/deet-logo.png";
import AdUI from "../assets/ui.png";
import deetbg from "../assets/deet.png"
import appopener_text from "../assets/ac.png";
import GoogleAd from "../components/GoogleAd";
//import splash_adv from "../assets/splash/splash_adv.png";


class Splash extends Component {
  constructor(props) {
    super(props);
    this.state = { intentvalue: "", original_url: "", ostype: "" };
  }

  componentDidMount() {
    let apptag = this.props.match.params.apptype;
    let shortstring = this.props.match.params.shorturl;
    getURLandredirect(apptag, shortstring).then((res) => {
      this.setState({ intentvalue: res.data.app_intend });
      this.setState({ original_url: res.data.originalURL });
      this.setState({ ostype: res.data.os_type });
      let app_intend = this.state.intentvalue;
      let originalURL = this.state.original_url;

      const click_link = document.getElementById("abcd");
      console.log(app_intend);
      if (app_intend === "Desktop" || app_intend === "Mobile") {
        app_intend = originalURL;
      }
      if (this.state.ostype == "windows") {
        click_link.setAttribute("href", app_intend);
        click_link.click();
        //console.log("hello")
      } else {
        click_link.setAttribute("href", app_intend);
        window.location.assign(app_intend);
      }
    });
  }

  render() {
    return (
      // <div className={classes.mainContainer}>

      //     {/* <h1>Splash page - {this.props.match.params.apptype}</h1>
      //     <a href={this.state.intentvalue}>{this.state.intentvalue}</a> */}

      //     <div className = 'heading'>
      //         <a href="https://midas.appopener.com/">
      //             <img src={new_logo} style={{"width": "210px"}} alt="AppOpener" />
      //         </a>
      //     </div>
      //     <div className= 'heading'>
      //         <h1 style={{color:"#fd5331", "margin-top": "1px"}}>Name is verse, Omniverse!</h1>
      //     </div>
      //     <div className='heading'>
      //         <p className="title-text" style={{fontFamily:"monospace",fontSize:"17px", "margin-top": ".05px"}}>Building towards Web 3.0</p>
      //     </div>

      //     <center style={{"margin-top": "22px"}}>
      //     <a id="abcd" target="_blank" style={{"text-decoration": "none", "font-size": "30px", "font-family": "monospace","backgroundColor":"#ffc107","padding":"10px 20px 10px 20px"}}>Continue</a>
      //     </center>
      //     <center style={{"margin-top": "33px"}}>
      //         {/* <a href="https://www.appopener.com/open">
      //             <img class="rotate" id="sticker" src={appopener_text} alt="AppOpener" />
      //             </a> */}

      //         <p style={{fontFamily:"monospace",fontSize:"16px"}}>"Genie, You are free!"<br/>Date: 27.12.2022<br/>Time: 12:29:29 - 0:00:00<br/>Speed: 90000 sec/day</p>
      //         <br/>

      //         <p style={{fontFamily:"monospace",fontSize:"15px"}}>Click below for more!</p>
      //         <a href="https://deet.me/dheet">
      //             <img src={deetmelogo} style={{"width": "180px"}} alt="AppOpener" />
      //         </a>
      //         <br/>
      //         <h1 style={{color:"#fd5331"}}>deet.me for ढीट</h1>

      //     </center>

      //     {/* <center>
      //         <p class="text" style={{"margin-top": "50px"}}>Boosting Your Link ....</p>
      //         </center> */}

      //     {/* <div className="poster_container">
      //         <center>
      //         <a href="https://yellowdiary.appopener.com/" target="_blank">
      //                 <img class="splash_poster img-responsive" src={splash_adv} alt="AppOpener" />
      //             </a>
      //             </center>
      //         </div> */}

      //     {/* <center>
      //         <p class="footer">
      //             <br /><br/>
      //             <p style={{"float":"left","marginLeft":"10px",fontFamily:"monospace",fontSize:"15px"}}>Click here -></p>
      //         </p>
      //     </center> */}

      // </div>

      // </>
      <div className={classes.mainContainer}>
        <div className="App">

          {/* <GoogleAd slot="6552881547" googleAdId="ca-pub-5645705217995911"/> */}
          <br/>
          <div className="container-1">
            <a id="abcd" target="_blank">
              <button><img src={close} alt="deet" width="120" height="60"/></button>
            </a>
             <br/>
            <span>{`Skip Login by APPOPENER`}</span>
                        
            <br/>
            <iframe width="360" height="270" src="https://www.youtube-nocookie.com/embed/ZAmiTLmmznw?controls=0&autoplay=1" title="YouTube video player" frameborder="0" allow="accelerometer; clipboard-write; encrypted-media; gyroscope; picture-in-picture" allowfullscreen></iframe>
  
            <br/> 
           <a href="https://rzp.io/l/AppOpener" target="_blank" className="btn btn-warning btn-lg" style={{marginTop:"0px",marginLeft:"10px",marginBottom:"10px", "box-shadow":"0 0 0 1px #f0ad4e inset, 0 0 0 2px rgba(255,255,255,0.15) inset, 0 8px 0 0 #eea236, 0 8px 0 1px rgba(0,0,0,0.4), 0 8px 8px 1px rgba(0,0,0,0.5)"}}> ADVERTISE </a>
            <a href="https://rzp.io/l/AppOpener" target="_blank">
                 <br/>
                {`JOIN our CREATORS`}
            </a>
          </div>

          <div className="container-1">
            <a href="https://mythvista.com/appad/?sub4=AppopnnerTest1&kw=DownloadApp&d=link" target="_blank">
             <img src={donotpresslogo} alt="deet" width="150" height="150" />
              </a>
            
            <br/>
            <a href="https://www.appopener.co.in/" target="_blank">
                {`Create shortlinks for your social media posts/content and see their realtime clicks on dashboard easily`}
            </a>
            <br/> 
          </div>

          {/* <GoogleAd slot="4955640795" googleAdId="ca-pub-5645705217995911"/> */}

          <div className="container-2">
            {/* <a
                href="https://www.instagram.com/er.dheet/"
                target="_blank"
                style={{ textDecoration: "none" }}
            >
                <img
                src={deetpng}
                alt="Win an iPhone14 Pro in just ₹150"
                style={{ width: "100%", height: "100%" }}
                />
            </a> */}
            <div>
              <iframe width="360" height="270" src="https://www.youtube-nocookie.com/embed/n1Y1tQU-6Fs?controls=0&autoplay=1" title="YouTube video player" frameborder="0" allow="accelerometer; clipboard-write; encrypted-media; gyroscope; picture-in-picture" allowfullscreen></iframe>
              {/* <iframe width="363" height="271" src="https://www.youtube.com/embed/zm6xa3ggt5A?autoplay=1" title="BB Ki Vines Productions- Taaza Khabar | Hotstar Specials | Official Trailer" frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" allowfullscreen></iframe> */}
              {/* <iframe width="360" height="270" src="https://www.youtube.com/embed/zm6xa3ggt5A?controls=0&amp;start=1" title="YouTube video player" frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" allowfullscreen></iframe> */}
              {/* <iframe width="420" height="315" src="https://www.youtube.com/embed/1k3HXPRDvCo?autoplay=1&mute=1"></iframe> */}
            </div>

            <div className="container-1">
              <br/>
              <img src={slogo} alt="deet" />
              <br/> 
              <span>{`SPAWNSER`}</span>
              <a href="https://www.instagram.com/vrspawnser" target="_blank">
                  {`Get Spawnsered!`}
              </a>
              <br/>
              <br/>
              <h1>
                WHY APPOPENER.COM?
              </h1>
              <p>
              In the fast-paced realm of digital connectivity, simplicity is the ultimate sophistication. At Appopener, we embark on a mission to redefine the digital experience through our groundbreaking solution: Login Skip. Our vision is ambitious yet straightforward – to revolutionize the way users engage with online platforms by offering a seamless, one-time login solution. With Login Skip, we aim to streamline user onboarding, amplify engagement, and cultivate a heightened sense of awareness and mindfulness while traversing the expansive online landscape.

Central to our ethos is a steadfast commitment to privacy and security. In an era marked by growing concerns over data breaches and privacy infringements, we recognize the paramount importance of safeguarding user information. Through stringent security measures and robust privacy protocols, we ensure that users can navigate the digital realm with peace of mind, knowing that their personal data remains protected at all times.

At the heart of our approach lies a dedication to creating a personalized, user-centric environment. We believe in empowering individuals to effortlessly access and derive value from the Appopener ecosystem. By leveraging cutting-edge technologies and innovative design principles, we strive to tailor the digital experience to the unique preferences and needs of each user, fostering a deeper sense of connection and belonging within our community.

As we look towards the future, our aspirations extend beyond mere technological innovation. We envision a self-sustainable, self-marketable product ecosystem that transcends conventional boundaries and paves the way for the utopic internet of tomorrow. Through collaboration, creativity, and a relentless pursuit of excellence, we seek to shape a digital landscape that is not only functional and efficient but also inherently ethical and humane.

In pursuit of our goals, we remain unwaveringly committed to fostering a culture of transparency, integrity, and accountability. We believe that by operating with honesty and integrity, we can earn the trust and confidence of our users, laying a solid foundation for long-term success and sustainability. Transparency isn't just a buzzword for us—it's a guiding principle that informs every aspect of our operations, from product development to customer service.

At Appopener, we understand that true innovation is born out of collaboration and diversity of thought. That's why we actively seek out partnerships with like-minded individuals and organizations who share our passion for reimagining the digital landscape. Together, we can pool our resources, expertise, and insights to drive meaningful change and create a brighter, more inclusive future for all.

In conclusion, Appopener is more than just a company—it's a movement. A movement towards a more seamless, secure, and user-centric digital experience. With Login Skip as our flagship offering, we are poised to revolutionize the way users interact with online platforms, ushering in a new era of simplicity, privacy, and empowerment. Join us on this journey as we strive to make the internet a better, safer, and more enjoyable place for everyone.
              </p>
              <br/> 
            </div>

          </div>

        </div>
      </div>
    );
  }
}

export default Splash;
