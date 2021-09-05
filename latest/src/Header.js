import React from 'react'
import './Header.css'
import $ from 'jquery'
import { Link } from 'react-router-dom'

function Header() {

    
    return (
        <div>
            <head>
            <meta charset="utf-8"/>

            <meta http-equiv="X-UA-Compatible" content="IE=edge"/>
            <meta name="viewport" content="width=device-width, initial-scale=1.0"/>

            <title>Responsive Menu</title>
            <link rel="stylesheet" type="text/css" href="style.css" />
            
            <script src="https://kit.fontawesome.com/c8e4d183c2.js" crossorigin="anonymous"></script>
            <link href="https://fonts.googleapis.com/css2?family=Inconsolata:wght@500;900&display=swap" rel="stylesheet"/>
            </head>

<body>
  <section class="navigation">
    <header>

     
      <div class="toggle"></div>

      <nav class="menu">

        <div class="logo">LOGO</div>
        
        <ul>
          <li><a href="#">Home</a></li>
          <li class="sub-menu"><a href="#">Products</a>
            
            <ul>
              <li><a href="#">Submenu One</a></li>
              <li><a href="#">Submenu Two</a></li>
              <li><a href="#">Submenu Three</a></li>
            </ul>
          </li>
          <li><a href="#">Portfolio</a></li>
          <li><a href="#">Watch</a></li>
          <li class="sub-menu"><a href="#">Services</a>
          
            <ul>
              <li><a href="#">Submenu One</a></li>
              <li><a href="#">Submenu Two</a></li>
              <li><a href="#">Submenu Three</a></li>
            </ul>
          </li>
          <Link to="/login">
          <li><a href="#">Login/ Sign Up</a></li>

            </Link>
         
        </ul>
      </nav>

    
      <div class="search-icon"></div>
    </header>
  </section>

 
  <div class="search-box">
    <input type="text" placeholder="search something here?"/>
    <div class="s-icon"><i class="fa fa-search"></i></div>
  </div>

  <script type="text/javascript" src="Jquery.js"></script>

  <script type="text/javascript">
    $(document).ready(function() {
      $('.search-icon').click(function() {
        $('.search-icon').toggleClass('active') //Change Icon change when clicked
        $('.search-box').toggleClass('active') // box show when clicked
      })
    });
    
    $(document).ready(function() {
      $('ul li').click(function() {
        $(this).siblings().removeClass('active') //Change BARS when clicked
        $(this).toggleClass('active') // Add A ctive Class
      })
    });
    
    $(document).ready(function() {
      $('.toggle').click(function() {
        $('.toggle').toggleClass('active') //Remove Active Class when clicked
        $('header').toggleClass('active-menu') //Remove Active Class when clicked
      })
    });
  </script>
</body>
        </div>
    )
}

export default Header
