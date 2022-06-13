import { Component, ElementRef, OnInit, ViewChild, ViewEncapsulation } from '@angular/core';

interface Typing {
  value: string;
  active: boolean;
  status: string;
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
  public dataText: string = 'We and our partners store and/or access information on a device, such as cookies and process personal data, such as unique identifiers and standard information sent by a device for personalised ads and content, ad and content measurement, and audience insights, as well as to develop and improve products. With your permission we and our partners may use precise geolocation data and identification through device scanning. You may click to consent to our and our partners’ processing as described above. Alternatively you may access more detailed information and change your preferences before consenting or to refuse consenting. Please note that some processing of your personal data may not require your consent, but you have a right to object to such processing. Your preferences will apply to this website only. You can change your preferences at any time by returning to this site or visit our privacy policy.';

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
  initData(dataMap = this.dataText?.split(' ')) {
    this.dataMap = dataMap.map((m: string, i: Number) => ({
      value: m,
      active: i == 0 ? true : false,
      status: i == 0 ? 'label-default' : '',
    }));
  }

  /**
   * Space event
   * @param e 
   */
  onSpace(e: any) {
    this.dataMap = this.dataMap.map((m, i) => {
      const value = e?.target?.value?.trim();
      const previous = this.dataMap[i != 0 ? i - 1 : 0];
      const equal = m.value == value;
      if (m.status) {
        const status = equal ? 'text-success' : (new RegExp(/(default|success)/g).test(m.status) ? 'text-success' : 'text-danger');
        return { ...m, active: false, status: status };
      } if (previous.status) {
        return { ...m, active: true, status: 'label-default' };
      } else {
        return m;
      }
    });

    // audio play
    for (const [i, item] of this.dataMap.entries()) {
      const value = e?.target?.value?.trim();
      const previous = this.dataMap[i != 0 ? i - 1 : 0];
      const equal = previous?.value === value;
      if (item.active) {
        this.playAudioJS(`assets/${equal ? 'success' : 'wrong'}.mp3`, 1);
      }
    }

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
          return { ...m, status: equal ? 'label-default' : 'label-danger' };
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
    this.initData(this.shuffleArray(this.dataText?.split(' ')));
    this.playAudioJS(`assets/random.mp3?v=${Date.now()}`, 1);
  }

  /**
   * onUpdate
   */
  onUpdate() {
    // store
    localStorage.setItem('typing-data', this.dataText);
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
    return item.id; // unique id corresponding to the item
  }

  /**
   * @param {*} path: audio
   * @param {*} volume: number
   */
  playAudioJS(path: string, volume: number) {
    const audio = new Audio();
    audio.currentTime = 0;
    audio.src = path;
    audio.volume = volume;
    audio.play().catch((error) => {
      console.log('Exception play audio: issue', error);
    });
  }
}
