import React from 'react'
import group from "../../images/group.png"

function Home() {
  return (
    <div className='mx-[-13.15%] bg-blue-900 pb-[-1%] px-16'>
      <section className='text-white py-[10%]'>
        <div className="flex ">
          <div className="">
            <h3>Lorem ipsum, dolor sit amet consectetur adipisicing elit. Eligendi doloribus voluptate suscipit sequi quos rem totam, ipsum nam ducimus fuga maxime accusantium harum explicabo inventore sint ut. Ipsam, fugit tenetur!</h3>
          </div>
          <div className="">
            <img src={group} alt="Group of people" />
          </div>
        </div>
      </section>
    </div>
  )
}

export default Home