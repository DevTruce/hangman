<a id="readme-top"></a>

<div align="center">

[![Contributors][contributors-icon]][contributors-link]
[![Forks][forks-icon]][forks-link]
[![Stargazers][stars-icon]][stars-link]
[![Issues][issues-icon]][issues-link]
[![MIT License][license-icon]][license-link]

</div>

<!-- PROJECT LOGO -->
<br />
<div align="center">
  <a href="https://github.com/DevTruce/hangman">
    <img src="src/imgs/logo.png" alt="Logo" width="80" height="80">
  </a>

<h3 align="center">hangman</h3>

  <p align="center">
    hangman game
    <br />
    <a href="https://github.com/DevTruce/hangman" target="_blank"><strong>Explore the docs »</strong></a>
    <br />
    <br />
    <a href="https://devtruce.github.io/hangman/" target="_blank">View Demo</a>
    ·
    <a href="https://github.com/DevTruce/hangman/issues" target="_blank">Report Bug</a>
    ·
    <a href="https://github.com/DevTruce/hangman/issues" target="_blank">Request Feature</a>
  </p>
</div>

<!-- TABLE OF CONTENTS -->
<details>
  <summary>Table of Contents</summary>
  <ol>
    <li>
      <a href="#about-the-project">About The Project</a>
      <ul>
        <li><a href="#built-with">Built With</a></li>
      </ul>
    </li>
    <li><a href="#usage">Usage</a></li>
    <li><a href="#license">License</a></li>
    <li><a href="#contact">Contact</a></li>
    <li><a href="#acknowledgments">Acknowledgments</a></li>
    
  </ol>
</details>

<!-- ABOUT THE PROJECT -->

## About The Project

[![Product Name Screen Shot][product-screenshot]](product-link)

The classic hangman game! I had a blast building this project and I came across several challenges that in the end made me a stronger developer! This has been my favorite project so far and I am excited to make it even better in the future!

One of the main challenges I faced during this project was how to implement the blank slots for the random word generated as well as how to update them when the user guessed a correct letter. After some research along with trial and error I managed to solve both issues! For the first issue I simply looped the length of the generated word and created a new div, assigned it a class and appended it to the necessary element each iteration. In doing this I was able to solve the blank slot issues! along with some css the style it accordingly of course.

For the second issue I solved it in a similar manner by simply looping the length of the generated word and checking if the user guess and === to the generated word in the current index, this allowed me to compare the user guess directly to each letter in the generated word. After that I assigned the userguessed letter to the corrisponding div element using the index to ensure that the letter would be displayed in the correct position.

Overall this project has been a great challenge and learning experience! I plan to refactor the code and clean up the project soon because I know I can do better! I just wanted to get this project working before focusing on producing the best code I can. I also plan to add a feature that will give you the option to play this along OR with a friend! The feature will simply allow one player to create the random word to then be guessed by the other!

Today I went ahead an updated this project with some new features, refactored the code base a bit and I also made the game work on most devices with a nice simple design! I seriously have had such an amazing time developing this project! It felt very daunting in the beginning and I was unsure of my capabilities because so far I have only spent a few hours learning js outside of building this project. This project took me awhile to fully complete but I learned so much and really solidified other concepts that I knew.

Here are the features that I have implemented:

- 1 player or 2 player game mode (play with a friend!)
- earn coins by winning matches and spend those coins on reveals to solve words easier!
- easy or hard mode
- updated the word lists and created 2 seperated word lists
- average guess counter / total games counter / wins counter

During this project I have learned so much! I also learned some key weakpoints of mine that I plan to work on! I know that I can do a MUCH better job with the html/css/sass in this project but that was not my focus with the project so I did just throw it the html/css together quickly to allow me to focus on javascript. The main reason for me not taking the html/css too serious is the following:

- I was unsure if I could complete this project in the first place so I did not want to overthink or worry about the css.
- the reason I built this project was to learn/solidify javascript concepts nothing else.
- I plan to remake a WAY better hangman game in the future when I complete my javascript course.

### Built With

- [![HTML5][html5-icon]][html5-link]
- [![CSS3][css3-icon]][css3-link]
- [![SASS][sass-icon]][sass-link]
- [![JAVASCRIPT][JAVASCRIPT-icon]][JAVASCRIPT-link]

<p align="right">(<a href="#readme-top">back to top</a>)</p>

<!-- LICENSE -->

## License

Distributed under the MIT License. See `LICENSE.txt` for more information.

<p align="right">(<a href="#readme-top">back to top</a>)</p>

<!-- CONTACT -->

## Contact

Email: [DevTruce@Gmail.com]()

Discord: [Xzypher#9999]()

<p align="right">(<a href="#readme-top">back to top</a>)</p>

<!-- ACKNOWLEDGMENTS -->

## Acknowledgments

- [MDN Documentation](https://developer.mozilla.org/en-US/)

<p align="right">(<a href="#readme-top">back to top</a>)</p>

<!-- #### MARKDOWN LINKS & IMAGES #### -->

<!-- ## GitHub ##-->
<!-- links -->

[contributors-link]: https://github.com/DevTruce/hangman/graphs/contributors
[forks-link]: https://github.com/DevTruce/hangman/network/members
[stars-link]: https://github.com/DevTruce/hangman/stargazers
[issues-link]: https://github.com/DevTruce/hangman/issues
[license-link]: https://github.com/DevTruce/hangman/blob/master/LICENSE.txt

<!-- icons -->

[contributors-icon]: https://img.shields.io/github/contributors/DevTruce/hangman.svg?style=for-the-badge
[forks-icon]: https://img.shields.io/github/forks/DevTruce/hangman.svg?style=for-the-badge
[stars-icon]: https://img.shields.io/github/stars/DevTruce/hangman.svg?style=for-the-badge
[issues-icon]: https://img.shields.io/github/issues/DevTruce/hangman.svg?style=for-the-badge
[license-icon]: https://img.shields.io/github/license/DevTruce/hangman.svg?style=for-the-badge

<!-- ## Project ## -->

[product-screenshot]: src/imgs/Screenshot.png
[product-link]: https://devtruce.github.io/hangman/

<!-- ## Tech & Tools ## -->
<!-- links -->

[html5-link]: https://html-icon/
[css3-link]: https://css3-icon/
[sass-link]: https://sass-lang.com/
[bootstrap-link]: https://getbootstrap-icon
[javascript-link]: https://www.javascript-icon/
[reactjs-link]: https://reactjs.org/
[nextjs-link]: https://nextjs.org/
[expressjs-link]: https://expressjs-icon/

<!-- icons -->

[html5-icon]: https://img.shields.io/badge/HTML5-orange?style=for-the-badge&logo=html5&logoColor=white
[css3-icon]: https://img.shields.io/badge/CSS3-blue?style=for-the-badge&logo=CSS3&logoColor=white
[sass-icon]: https://img.shields.io/badge/SASS-AA77FF?style=for-the-badge&logo=SASS&logoColor=white
[bootstrap-icon]: https://img.shields.io/badge/Bootstrap-563D7C?style=for-the-badge&logo=bootstrap&logoColor=white
[javascript-icon]: https://img.shields.io/badge/Javascript-FCE22A?style=for-the-badge&logo=javascript&logoColor=black
[reactjs-icon]: https://img.shields.io/badge/React-20232A?style=for-the-badge&logo=react&logoColor=61DAFB
[nextjs-icon]: https://img.shields.io/badge/next.js-000000?style=for-the-badge&logo=nextdotjs&logoColor=white
[expressjs-icon]: https://img.shields.io/badge/Express.js-000000?style=for-the-badge&logo=express&logoColor=white
