
<template>
  <div class="bulba-container">
    <div class="bulbasaur">
        <div class="bulbs">
            <div class="bulb"></div>
        </div>
        <div class="body">
            <div class="spot"></div>
        </div>
        <div class="head">
            <div class="eye">
            <div class="pupil"></div>
            </div>
            <div class="eye-lid"></div>
            <div class="smile"></div>
            <div class="spot"></div>
        </div>

        <div class="ears"></div>

        <div class="hind-legs">
            <div class="leg"></div>
            <div class="leg"></div>
        </div>
        <div class="legs">
            <div class="leg">
            <div class="spot"></div>
            </div>
            <div class="leg">
            <div class="spot"></div>
            </div>
        </div>

      <div class="spots">
            <div class="spot"></div>
            <div class="spot"></div>
            <div class="spot"></div>
            <div class="spot"></div>
            <div class="spot"></div>
        </div>
    </div>
  </div>
</template>

<style lang="scss" scoped>
  $sky-gradient-color: rgb(255, 205, 214);
  $sky-gradient: to bottom, #d9a7c7 20%, #fffcdc 50%;

  // $sky-gradient-color: rgb(255, 205, 214);
  // $sky-gradient: to bottom, #d9a7c7 20%, #d4f0ff 40%;

  $grass-gradient-color: #11998e;
  $grass-gradient-color: #085078;
  $grass-gradient: to bottom, #6cc7bc, #085078;

  $bush-base-color: #000033;
  $bush-mid-color: darken(#117299, 10%);

  $background-trees-color: darken(#55a5b9, 8%);
  $background-trees-color: #3992ce;
  $background-trees-color: #117299;

  $tree-box-shadow: darken($background-trees-color, 5%);
  $background-forest-color: #295980;

  $forest-gradient: to bottom, #004e92, #000428;
  $big-tree-color: $bush-base-color;

  $head-radius-top: 50% 25px;
  $head-radius-bottom: 18px;
  $bulbasaur-body: #56ddff;
  $bulbasaur-spot: darken($bulbasaur-body, 25%);
  $bulb: #009682;
  $bulb-dark: darken($bulb, 10%);

  $flight: 30s;
  $sparkle-colors: #fffce6, #ffeefc, #f3ffe4, #e9fbff;

  @function randomNum($min, $max) {
    $rand: random();
    @return ($min + floor($rand * (($max - $min) + 1)));
  }

  @mixin linear-gradient($fallback, $gradient-args...) {
    background-color: $fallback;
    -webkit-linear-gradient: linear-gradient($gradient-args);
    background-image: linear-gradient($gradient-args);
  }

  @mixin sparkleColor($color) {
    background-color: $color;
    box-shadow: 0px 0px 10px $color;
  }

  @mixin flight($aniName, $x, $y) {
    @keyframes #{$aniName} {
      95% {
        opacity: 1;
      }
      100% {
        transform: translate($x, $y);
        opacity: 0;
      }
    }
  }

  @mixin animateSparkles($delay, $start, $end, $ani, $x, $y, $inc, $delta) {
    @include flight($ani, $x, $y);
    @for $i from $start through $end {
      &:nth-child(#{$i}) {
        animation: #{$ani} $flight + $inc $delay infinite;
        $delay: $delay + $delta;
      }
    }
  }

  body {
    width: 100%;
    height: 100%;
    background-color: #fffaf0;
  }

  .bulbasaur {
    width: 60px;
    height: 50px;
    top: 293px;
    right: 35px;
    transform: rotate(-6deg);
    will-change: transform;

    &:before {
      content: "";
      position: absolute;
      width: 80px;
      height: 15px;
      top: 8px;
      right: 5px;
      border-radius: 100%;
      transform: rotate(6deg);
      background-color: rgba(0, 0, 0, 0.2);
    }

    .bulbs {
      position: absolute;
      left: -10px;
      top: -8px;
      transform: rotate(15deg);
      z-index: 2;
      animation: bulbMove 1.5s infinite;

      &:before {
        position: absolute;
        content: "";
        width: 38px;
        height: 38px;
        background-color: $bulb-dark;
        border-bottom-left-radius: 100%;
        border-bottom-right-radius: 100%;
        border-top-left-radius: 100%;
        right: 20px;
        bottom: 30px;
        left: 15px;
        transform: rotate(-20deg);
        z-index: 3;
      }
      &:after {
        position: absolute;
        content: "";
        width: 35px;
        height: 35px;
        background-color: $bulb-dark;
        border-bottom-left-radius: 100%;
        border-bottom-right-radius: 100%;
        border-top-right-radius: 100%;
        left: 40px;
        bottom: 30px;
        transform: rotate(45deg);
        z-index: 2;
      }

      .bulb {
        position: absolute;
        width: 40px;
        height: 40px;
        background-color: $bulb;
        bottom: 30px;
        left: 25px;
        border-bottom-left-radius: 100%;
        border-bottom-right-radius: 100%;
        border-top-left-radius: 100%;
        transform: rotate(-35deg);
        z-index: 3;
      }
    }
    .body {
      position: relative;
      width: 105%;
      height: 100%;
      bottom: 35px;
      border-radius: 39% 61% 31% 69% / 54% 41% 59% 46%;
      background-color: $bulbasaur-body;
      overflow: hidden;
      animation: bodyBounce 1.5s infinite;

      & .spot {
        position: absolute;
        width: 8px;
        height: 8px;
        background-color: $bulbasaur-spot;
        right: -5px;
        top: 15px;
        border-radius: 20% / 60%;
        transform: skew(5deg);
      }
    }

    .head {
      position: absolute;
      width: 55px;
      height: 50px;
      background-color: $bulbasaur-body;
      border-radius: 51% 49% 20% 80% / 67% 18% 82% 33%;
      bottom: 45px;
      right: 30px;
      z-index: 3;
      overflow: hidden;
      animation: headMove 1.5s infinite;

      .spot {
        position: absolute;

        &:before,
        &:after {
          content: "";
          position: absolute;
          background-color: $bulbasaur-spot;
        }

        &:before {
          width: 8px;
          height: 8px;
          left: 7px;
          top: 5px;
          transform: rotate(30deg);
          border-radius: 40% 20% / 50% 60%;
        }

        &:after {
          width: 5px;
          height: 4px;
          left: 2px;
          top: 15px;
          transform: rotate(50deg);
          border-radius: 40% 20% / 50% 60%;
        }
      }

      .eye {
        width: 14px;
        height: 16px;
        background-color: white;
        border-radius: 88% 12% 11% 89% / 83% 47% 53% 17%;
        overflow: hidden;
        position: absolute;
        left: 15px;
        top: 13px;
        transform: rotate(5deg);
        border: 1px solid $background-forest-color;

        .pupil {
          position: absolute;
          width: 12px;
          height: 15px;
          border-radius: 100%;
          left: -2px;
          background-image: -webkit-radial-gradient(
              1px 5px at center,
              white 100%,
              transparent
            ),
            -webkit-radial-gradient(#df005d 100%, transparent);
          background-image: radial-gradient(
              1px 5px at center,
              white 100%,
              transparent
            ),
            radial-gradient(#df005d 100%, transparent);
        }
      }

      .eye-lid {
        position: absolute;
        width: 1px;
        height: 8px;
        background-color: darken($bulbasaur-body, 25%);
        border-radius: 100px;
        left: 22px;
        transform: rotate(60deg);
        top: 8px;
      }

      .smile {
        position: absolute;
        width: 10px;
        height: 6px;
        border-radius: 100%;
        border-top: 1px solid $bush-mid-color;
        top: 32px;
        transform: rotate(5deg);
        left: -2px;

        &:after {
          position: absolute;
          content: "";
          width: 15px;
          height: 6px;
          border-radius: 100%;
          border-bottom: 1px solid $bush-mid-color;
          top: -5px;
          left: 6px;
        }
      }
    }

    .ears {
      position: absolute;
      width: 20px;
      height: 20px;
      border-radius: 88% 12% 8% 92% / 91% 94% 6% 9%;
      transform: rotate(260deg);
      background-color: $bulbasaur-body;
      bottom: 76px;
      left: 15px;
      z-index: 3;
      animation: earMove 1.5s infinite;
    }

    .legs {
      position: absolute;
      width: 100%;
      height: 100%;
      bottom: 15%;

      .leg {
        position: absolute;
        width: 20px;
        height: 22px;
        border-radius: 10% 10% 28% 32% / 0% 0% 53% 60%;
        background-color: $bulbasaur-body;
      }

      .leg:nth-child(1) {
        left: -5px;
        & .spot {
          position: absolute;
          width: 7px;
          height: 6px;
          top: 10px;
          left: 4px;
          z-index: 10;
          background-color: $bulbasaur-spot;
          border-radius: 20% / 30%;
          transform: skewY(-35deg);
        }
        animation: moveLeg 1.5s ease infinite;
      }

      .leg:nth-child(2) {
        bottom: 45%;
        left: 30px;

        & .spot {
          position: absolute;
          width: 12px;
          height: 10px;
          background-color: $bulbasaur-spot;
          top: 5px;
          left: 4px;
          border-radius: 35% 21% 50% 43% / 54% 60% 70% 60%;
          transform: skewY(-20deg) skewX(10deg);
        }
        animation: moveLeg 1.5s 0.5s infinite;
      }
    }

    .hind-legs {
      position: absolute;
      width: 100%;
      height: 100%;
      bottom: 17%;

      & .leg {
        background-color: darken($bulbasaur-spot, 10%);
        position: absolute;
        width: 20px;
        height: 22px;
        border-radius: 10% 10% 28% 32% / 0% 0% 53% 60%;
        z-index: -2;

        &:nth-child(1) {
          animation: moveHindLeg 1.5s 0.8s infinite;
        }

        &:nth-child(2) {
          left: 32px;
          bottom: 45%;
          animation: moveHindLeg 1.5s 1s infinite;
        }
      }
    }

    .spots {
      position: absolute;
      width: 100%;
      height: 100%;
      bottom: 100%;
      z-index: 3;

      .spot {
        position: absolute;
        background-color: $bulbasaur-spot;

        &:nth-child(1) {
          // fancy border radius:
          // first 4 numbers define horizontal raidii
          // second set defines vertical raidii
          width: 18px;
          height: 12px;
          left: 30px;
          top: 28px;
          transform: rotate(-5deg);
          border-radius: 30% 72% 90% 40% / 40% 78% 51% 60%;
        }

        &:nth-child(2) {
          width: 5px;
          height: 3px;
          left: 45px;
          top: 40px;
          border-radius: 30% 80% 50% 40% / 45% 20% 20% 60%;
          transform: skew(10deg);
        }
      }
    }
  }

  .animation-container {
    position: relative;
    overflow: hidden;
    display: flex;
    align-items: center;
    // top: 110px;
  }

  .bulba-container {
    bottom: 0vh;
    left: 0vh;
    min-width: 450px;
    height: 240px;
    display: flex;
    justify-content: space-around;
    align-items: flex-end;
    position: relative;
    animation: 
      25s linear infinite;
  }

  @keyframes moveLeg {
    0% {
      transform: rotate(20deg);
    }
    50% {
      transform: rotate(-20deg);
    }
    80% {
      transform: rotate(0deg) translateY(-1px);
    }
    100% {
      transform: rotate(20deg);
    }
  }

  @keyframes moveHindLeg {
    0% {
      transform: rotate(25deg);
    }
    50% {
      transform: rotate(-25deg);
    }
    80% {
      transform: rotate(0deg) translateY(-1px);
    }
    100% {
      transform: rotate(25deg);
    }
  }

  @keyframes bodyBounce {
    50% {
      transform: rotate(2deg) translateX(-1px);
    }
  }

  @keyframes headMove {
    50% {
      transform: rotate(-2deg) translateX(-1px);
    }
  }

  @keyframes earMove {
    50% {
      transform: rotate(265deg) translateX(-1px) translateY(-1px);
    }
  }

  @keyframes bulbMove {
    50% {
      transform: rotate(16deg) translateY(0.5px);
    }
  }

  @keyframes bulbaWalk {
    100% {
      transform: translateX(-66.66666%);
    }
  }
</style>