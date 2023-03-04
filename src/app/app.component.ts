import { Component, ElementRef, OnInit, ViewChild, ViewEncapsulation } from '@angular/core';
import { success_audio, wrong_audio } from './base64.audio';

interface Typing {
  value: string;
  active: boolean;
  status: string;
}

class Lession {
  public key: string;
  public src: string;
  public title: string;
  public introduce: string;
  constructor(
    private _key: string,
    private _src: string,
    private _title: string,
    private _introduce: string
  ) {
    this.key = _key;
    this.src = _src;
    this.title = _title;
    this.introduce = _introduce;
  }
}

@Component({
  selector: 'app-root',
  templateUrl: `./app.component.html`,
  styleUrls: ['./app.component.scss'],
  encapsulation: ViewEncapsulation.None,
})
export class AppComponent implements OnInit {

  @ViewChild('welcomeRef', { static: true }) welcomeRef!: ElementRef;

  /**
   * Declare variable
   */
  public dataMap: Typing[] = [];
  public dataText: string = '';

  public lession: Lession[] = [];
  public selected: Lession = new Lession('', '', '', '');
  public length: number = 200;
  public split: number = 4;

  /**
   * Init lifecycle
   */
  ngOnInit(): void {
    // load store
    this.initStore();
    // init data
    this.initData();
    // play welcome
    this.playAudioJS(`assets/welcome.mp3?v=${Date.now()}`, 1);
    // lession
    this.initLession();
  }

  /**
   * initStore
   */
  initStore() {
    this.dataText = localStorage.getItem('typing-data') ?? this.dataText;
  }

  /**
   * initData
   */
  initData(dataMap = this.dataTextList) {
    this.dataMap = dataMap.map((m: string, i: Number) => ({
      value: m.trim(),
      active: i == 0 ? true : false,
      status: i == 0 ? 'label-default' : '',
    }));
  }

  /**
   * initLession
   */
  initLession(): void {
    this.lession.push(new Lession('asdf', 'assets/typing-tutor-lesson1.jpg', 'Bài 1 - Tập Tay Trái', 'Trong bài đầu tiên bạn sẽ tập với tay trái. \n Đặt các ngón tay của bạn trên bàn phím như hình bên dưới.'));
    this.lession.push(new Lession('jkl;', 'assets/typing-tutor-lesson2.webp', 'Bài 2 - Tập Tay Phải', `Trong bài học này, \n bạn sẽ luyện tập với các ngón tay của bàn tay phải. `));
    this.lession.push(new Lession('asdfjkl;', 'assets/typing-tutor-lesson3.webp', 'Bài 3 - Tập Hai Tay', `Trong bài học này, \n bạn sẽ kết hợp các kỹ năng đánh máy mà bạn đã học được trong hai bài học trước. `));
    this.lession.push(new Lession('asdfghjkl;', 'assets/typing-tutor-lesson4.webp', 'Bài 4 - Phím G và H', `Bây giờ, mỗi ngón tay trỏ của bạn sẽ nhấn thêm một phím. \n Trong hình bên dưới, các phím mới được thêm vào được hiển thị bằng màu cam.`));
    this.lession.push(new Lession(`asdfghjkl;'`, 'assets/typing-tutor-lesson5.webp', 'Bài 5 - Phím dấu nháy đơn', `Ngoài ngón trỏ, ngón út bên phải của bạn cũng sẽ nhấn nhiều phím.`));
    this.lession.push(new Lession(`asdfghjkl;':"`, 'assets/typing-tutor-lesson6.webp', 'Bài 6 - Thực Hành Phím Shift', `Trong bài học này, bạn sẽ học cách sử dụng các phím SHIFT.\n Bài này tương đối khó hơn các bài trước. `));
    this.lession.push(new Lession(`asdfghjkl;':"qwert`, 'assets/typing-tutor-lesson7.webp', 'Bài 7 - Tay Trái Hàng Trên', `Trong bài học này, \n bạn sẽ học cách sử dụng các ngón tay trái với hàng trên cùng.`));
    this.lession.push(new Lession(`asdfghjkl;':"qwertyuiop`, 'assets/typing-tutor-lesson8.webp', 'Bài 8 - Tay Phải Hàng Trên', `Trong bài học này, \n tay phải của bạn được giới thiệu ở hàng trên cùng.`));
    this.lession.push(new Lession(`asdfghjkl;':"qwertyuiopzxcvb`, 'assets/typing-tutor-lesson9.webp', 'Bài 9 - Hàng Dưới Tay Trái', `Trong bài học này, \n tay trái của bạn sẽ bắt đầu gõ các phím của hàng dưới cùng.`));
    this.lession.push(new Lession(`asdfghjkl;':"qwertyuiopzxcvbnm,.?`, 'assets/typing-tutor-lesson10.webp', 'Bài 10 - Hàng Dưới Tay Phải', `Trong bài học này, \n tay phải của bạn sẽ bắt đầu gõ các phím của hàng dưới cùng.`));
    this.lession.push(new Lession(`asdfghjkl;':"qwertyuiopzxcvbnm,.?12345`, 'assets/typing-tutor-lesson11.webp', 'Bài 11 - Hàng Số Tay Trái', `Trong bài học này, bạn sẽ học cách gõ các số 1,2,3,4 và 5.`));
    this.lession.push(new Lession(`asdfghjkl;':"qwertyuiopzxcvbnm,.?1234567890`, 'assets/typing-tutor-lesson12.webp', 'Bài 12 - Hàng Số Bên Tay Phải', `Trong bài tập 6,7,8,9 và 0 này sẽ được thực hành với tay phải.`));
    this.lession.push(new Lession(`asdfghjkl;':"qwertyuiopzxcvbnm,.?1234567890!@#$%^&*()_+-=`, 'assets/typing-tutor-lesson13.webp', 'Bài 13 - Ký hiệu Hàng Số', `Trong bài tập này, chúng tôi sẽ bao gồm các ký hiệu của hàng số.`));
    this.lession.push(new Lession(`asdfghjkl;':"qwertyuiopzxcvbnm,.?1234567890!@#$%^&*()_+-=[]{}<>/`, 'assets/typing-tutor-lesson14.png', 'Bài 14 - Các Ký Hiệu Trong Hàng Chữ', `Trong bài tập này, bạn sẽ thực hành như sau: \n { , } , [ , ] , < , > , /`));
    this.lession.push(new Lession(`asdfghjkl;':"qwertyuiopzxcvbnm,.?1234567890!@#$%^&*()_+-=[]{}<>/`, 'assets/typing-tutor-lesson15.png', 'Bài 15 - Toàn Tập Bàn Phím', ''));

    this.lession.push(new Lession(`+=]}_-{['"`, '', 'Bài 16 - Tập Tay Trái', 'Trong bài này chúng ta sẽ luyện ngón út phải'));
    this.lession.push(new Lession('!1qaz', '', 'Bài 17 - Tập Tay Trái', 'Trong bài này chúng ta sẽ luyện ngón út trái'));
    this.lession.push(new Lession(')0p;:/?', '', 'Bài 18 - Tập Tay Trái', 'Trong bài này chúng ta sẽ luyện ngón út phải'));
    this.lession.push(new Lession('!1qaz)0p;:/?', '', 'Bài 19 - Tập Tay Trái', 'Trong bài này chúng ta sẽ luyện ngón út trái và phải'));
    this.lession.push(new Lession('@2wsx', '', 'Bài 20 - Tập Tay Trái', 'Trong bài này chúng ta sẽ luyện ngón nhẫn trái'));
    this.lession.push(new Lession('9(ol.>', '', 'Bài 21 - Tập Tay Trái', 'Trong bài này chúng ta sẽ luyện ngón nhẫn phải'));
    this.lession.push(new Lession('@2wsx9(ol.>', '', 'Bài 22 - Tập Tay Trái', 'Trong bài này chúng ta sẽ luyện ngón nhẫn trái và phải'));
    this.lession.push(new Lession('3#edc', '', 'Bài 23 - Tập Tay Trái', 'Trong bài này chúng ta sẽ luyện ngón giữa trái'));
    this.lession.push(new Lession('8*ik,<', '', 'Bài 24 - Tập Tay Trái', 'Trong bài này chúng ta sẽ luyện ngón giữa phải'));
    this.lession.push(new Lession('3#edc8*ik,<', '', 'Bài 25 - Tập Tay Trái', 'Trong bài này chúng ta sẽ luyện ngón giữa trái và phải'));
    this.lession.push(new Lession('4$rfv', '', 'Bài 26 - Tập Tay Trái', 'Trong bài này chúng ta sẽ luyện ngón trỏ trái'));
    this.lession.push(new Lession('7&ujm', '', 'Bài 27 - Tập Tay Trái', 'Trong bài này chúng ta sẽ luyện ngón trỏ phải'));
    this.lession.push(new Lession('4$rfv7&ujm', '', 'Bài 28 - Tập Tay Trái', 'Trong bài này chúng ta sẽ luyện ngón trỏ trái và phải'));
    this.lession.push(new Lession('5%tgb', '', 'Bài 29 - Tập Tay Trái', 'Trong bài này chúng ta sẽ luyện ngón trỏ trái'));
    this.lession.push(new Lession('6^yhn', '', 'Bài 30 - Tập Tay Trái', 'Trong bài này chúng ta sẽ luyện ngón trỏ phải'));
    this.lession.push(new Lession('5%tgb6^yhn', '', 'Bài 3131 - Tập Tay Trái', 'Trong bài này chúng ta sẽ luyện ngón trỏ trái và phải'));
  }

  
  get dataTextTrim(): string {
    return this.dataText?.replace(/(\s+)/g,' ')?.trim();
  }
  
  get dataTextList(): string[] {
    return this.dataTextTrim?.split(' ');
  }

  /**
   * Select lession
   * @param item 
   */
  onLession(item: Lession): void {
    this.selected = item;
    this.dataText = this.randomText(item.key, this.length);
    this.initData(this.dataTextList);
    localStorage.setItem('typing-data', this.dataTextTrim);
  }

  /**
   * Random Text
   * @param characters 
   * @param length 
   * @returns 
   */
  randomText(characters: string, length: number): string {
    let result = '';
    let charactersLength = characters.length;
    let count = 0;
    Array.from(Array(length).keys()).forEach(f => {
      if (count === this.split) {
        count = 0;
        result += ' ';
      } else {
        count++;
        result += characters.charAt(Math.floor(Math.random() * charactersLength));
      }
    });
    return result;
  }

  /**
   * Space event
   * @param e 
   */
  onSpace(e: any) {
    const index = this.dataMap?.findIndex(el => el.active == true) - 1;

    // audio play
    for (const [i, item] of this.dataMap.entries()) {
      if(i != index) continue;
      const value = e?.target?.value?.trim();
      if (item.active) {
        const equal = item?.value === value;
        this.playAudioJS(equal ? success_audio : wrong_audio, 1);
      } else if (this.dataMap.length === i + 1 && item.status) {
        alert('Vui lòng nhấn nút random hoặc lựa chọn bài tập luyện khác. \nXin cảm ơn!')
      }
    }

    this.dataMap = this.dataMap.map((m, i) => {
      const value = e?.target?.value?.trim();
      const previous = this.dataMap[i != 0 ? i - 1 : 0];
      const equal = m.value == value;
      if (m.status && i > index) {
        const status = equal ? 'text-success' : (new RegExp(/(default|success)/g).test(m.status) ? 'text-success' : 'text-danger');
        return { ...m, active: false, status: status };
      } if (previous.status && i > index) {
        return { ...m, active: true, status: 'label-default' };
      } else {
        return m;
      }
    });

    // https://www.typingtyping.com/wpm-calculator/
    // Clean
    e.target.value = '';
  }

  /**
   * onInput
   * label-default
   * label-danger
   */
  onInput(e: any) {
    if (!e.Space) {
      this.dataMap = this.dataMap.map((m, i) => {
        const value = e?.target?.value?.trim();
        const equal = m?.value === value;
        if (m.active) {
          return { ...m, status: equal ? 'label-success' : 'label-danger' };
        } else {
          return m;
        }
      });
    }
  }

  /**
   * onRandom
   */
  onRandom() {
    this.initData(this.shuffleArray(this.dataTextList));
    this.playAudioJS(`assets/random.mp3?v=${Date.now()}`, 1);
  }

  /**
   * onUpdate
   */
  onUpdate() {
    // store
    localStorage.setItem('typing-data', this.dataTextTrim);
    // load store
    this.initStore();
    // init data
    this.initData();
    // play update-success
    this.playAudioJS(`assets/update-success.mp3?v=${Date.now()}`, 1);
  }

  /**
   * shuffleArray
   * @param array 
   * @returns 
   */
  shuffleArray(array: string[]) {
    for (let i = array.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [array[i], array[j]] = [array[j], array[i]];
    }
    return array;
  }

  /**
   * trackByFn
   * @param index 
   * @param item 
   * @returns 
   */
  trackByFn(index: Number, item: any) {
    return index; // unique id corresponding to the item
  }

  /**
   * @param {*} path: audio
   * @param {*} volume: number
   */
  playAudioJS(path: string, volume: number) {
    new Audio(path).play();
  }
}
