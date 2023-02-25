

import img from './Photo.jpg'
import './About.css'
import '../Skills/skills.css'
export default function About() {
  return (
    <div id='about'>
        <div className=" mt-5">
            <div className="d-flex flex-row justify-content-center mb-5 flex-wrap">
                <div className="p-2 d-flex flex-column width mt-5">
                    <div className="p-2 " ><p className='text-center display-4 color'>I create websites</p>
<p className="display-4">that are very much intriguing.</p></div>
                    <div className="p-2"><p className='size2'>Hi! myself Kartikay,a front-end developer and a student of IIT Patna. I create user friendly websites for companies.</p> 
                    </div>

                </div>
                <div className="p-2 mb-5">
                    <img src={img} alt="" className="hf" />
                </div>
            </div>
        </div>
        <div className="container d-flex flex-column justify-content-center mt-5">
            <div className="p-2 color margin-top"><h4 className="color"> Services</h4></div>
            <div className="p-2 display-5 font-weight-bold margin-bottom"><p>Skills that build one website at a time.</p></div>
        </div>
    </div>
  )
}
