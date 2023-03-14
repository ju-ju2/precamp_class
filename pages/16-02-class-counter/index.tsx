import { Component } from "react";
// render를 쓰기위해 Component를 가져와야되고 아래 Class를 만들 때 extents Component 한다. 우리가 쓰는 컴포넌트처럼 만드는 것

export default class ClassCounterPage extends Component {
  // 컴포넌트에서 변수 생성방법
  state = {
    count: 0,
  };

  // this를 맞춰주기위해 화살표 함수로 표현
  onClickCountUp = () => {
    this.setState({
      count: 1,
    });
  };

  // class 안에 render 를 하면 화면에 그려준다. 리액트에서 제공해주는 기능
  render() {
    return (
      <>
        {/* class 안에서 변수던 함수던 앞에 this가 다 생략되어있다. 불러오려면 this.을 붙여서 호춞해야 한다. */}
        <div>{this.state.count}</div>
        <button onClick={this.onClickCountUp}>카운트 올리기</button>
      </>
    );
  }
}

// class AAA {
//     power = 50,
//     attack(){

//     }
// }

// // extents의 기능
// // extents는 상속을 의미한다. BBB는 AAA 기능을 물려받는다.
// class BBB extends AAA {
//     run(){

//     }
// }

// const mybbb = new BBB()
// mybbb.power
// mybbb.attack
// mybbb.run
