import React, { useState } from 'react'

function About() {
  return (
    <div className='About'>
        <div className='A-header'>
            <h1>A-PROPOS</h1>
        </div>
        <div className="A-container">
            <section>
                <h2>A-Propos</h2>
            <p>Lorem ipsum dolor sit amet, consectetur adipisicing elit. Dignissimos delectus animi quibusdam recusandae magni? Totam beatae id optio quasi consequuntur ab ipsa, possimus, neque aliquam quam harum, soluta commodi numquam.</p>
            <p>Lorem ipsum dolor sit amet, consectetur adipisicing elit. Dignissimos delectus animi quibusdam recusandae magni? Totam beatae id optio quasi consequuntur ab ipsa, possimus, neque aliquam quam harum, soluta commodi numquam.</p></section>
            <section>
                <img src="/public/logo.png" alt="About" />
            </section>
        </div>
        <div className="A-service">
            <div className='As-header' >
                <h2>SERVICES</h2>
            </div>
            <div className='As-text'>
                <div>
                    <img src="/public/images/icone1.png" alt="" />
                    <section>
                        <h3>Gestion des véhicules</h3>
                        <p>Lorem ipsum dolor sit amet consectetur adipisicing elit. <br /> Aspernatur animi soluta sit porro, aperiam voluptatum tenetur explicabo unde, et pariatur, consequatur nisi cum deleniti qui iste voluptas molestias placeat. Asperiores!</p>
                    </section>
                </div>
                  <div>
                    <img src="/public/images/icone2.png" alt="" />
                    <section>
                        <h3>Gestion des parcings</h3>
                        <p>Lorem ipsum dolor sit amet consectetur adipisicing elit. Aspernatur animi soluta sit porro, aperiam voluptatum tenetur explicabo unde, et pariatur, consequatur nisi cum deleniti qui iste voluptas molestias placeat. Asperiores!</p>
                    </section>
                </div>
                  <div>
                    <img src="/public/images/icone3.png" alt="" />
                    <section>
                        <h3>Suivi maintenance</h3>
                        <p>Lorem ipsum dolor sit amet consectetur adipisicing elit. Aspernatur animi soluta sit porro, aperiam voluptatum tenetur explicabo unde, et pariatur, consequatur nisi cum deleniti qui iste voluptas molestias placeat. Asperiores!</p>
                    </section>
                </div>
                  <div>
                    <img src="/public/images/icone4.png" alt="" />
                    <section>
                        <h3>Rapports et analyses</h3>
                        <p>Lorem ipsum dolor sit amet consectetur adipisicing elit. Aspernatur animi soluta sit porro, aperiam voluptatum tenetur explicabo unde, et pariatur, consequatur nisi cum deleniti qui iste voluptas molestias placeat. Asperiores!</p>
                    </section>
                </div>
            </div>

        </div>
        <div className="A-equipe">
            <h2>Notre Equipe</h2>
            <div className='A-equipe-container'>
              <div>
                <img src="/public/images/V-7.png" alt="" />
                <h3>Ange.G</h3>
                <p>Developpeur Frontend</p>
            </div>
             <div>
                <img src="/public/images/V-7.png" alt="" />
                <h3>Ange.G</h3>
                <p>Developpeur Backend</p>
            </div>
            <div>
                <img src="/public/images/V-7.png" alt="" />
                <h3>Ange.G</h3>
                <p>Manager</p>
            </div>
            </div>

        </div>
    </div>
  )
}

export default About