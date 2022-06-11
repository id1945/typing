import { Component, OnInit, ViewEncapsulation } from '@angular/core';

@Component({
  selector: 'my-app',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
  encapsulation: ViewEncapsulation.None,
})
export class AppComponent implements OnInit {
  /**
   * Declare variable
   */
  public typing = [];
  public data: { value: string; active: boolean; status: string }[] = [];
  public text =
    'We and our partners store and/or access information on a device, such as cookies and process personal data, such as unique identifiers and standard information sent by a device for personalised ads and content, ad and content measurement, and audience insights, as well as to develop and improve products.With your permission we and our partners may use precise geolocation data and identification through device scanning. You may click to consent to our and our partners’ processing as described above. Alternatively you may access more detailed information and change your preferences before consenting or to refuse consenting.Please note that some processing of your personal data may not require your consent, but you have a right to object to such processing. Your preferences will apply to this website only. You can change your preferences at any time by returning to this site or visit our privacy policy.';

  /**
   * Init lifecycle
   */
  ngOnInit(): void {
    /**
     * Convert text to array
     * Random item
     */
    const strArr = this.shuffleArray(this.text.split(' '));
    /**
     *
     */
    this.data = strArr.map((m, i) => ({
      value: m,
      active: i == 0 ? true : false,
      status: i == 0 ? 'label-default' : '',
    }));
  }

  /**
   * Space event
   */
  onSpace(e) {

    /**
     * Data map
     */
    this.data = this.data.map((m, i) => {
      const value = e?.target?.value?.trim();
      const previous = this.data[i != 0 ? i - 1 : 0];
      const equal = this.replace(m.value) == value;
      if (m.status) {
        /**
         * text-success
         * text-danger
         */
        if (equal) {
          return { ...m, active: false, status: 'text-success'};
        } else {
          return { ...m, active: false, status: new RegExp(/(default|success)/g).test(m.status) ? 'text-success' : 'text-danger'};
        }
      } if (previous.status) {
        /**
         * label-default
         */
        return { ...m, active: true, status: 'label-default' };
      } else {
        return m;
      }
    });

    // Clean
    e.target.value = '';
  }

  /**
   * Input
   */
  onInput(e) {
    if (!e.Space) {
      /**
       * label-default
       * label-danger
       */
      this.data = this.data.map((m, i) => {
        const value = e?.target?.value?.trim();
        const equal = m?.value?.match(value);
        if (m.active) {
          return { ...m, status: equal ? 'label-default' : 'label-danger' };
        } else {
          return m;
        }
      });
    }
  }

  shuffleArray(array) {
    for (let i = array.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [array[i], array[j]] = [array[j], array[i]];
    }
    return array;
  }

  /**
   * Remove special character
   */
  replace(text) {
    return text.replace(/([,.;:])/g, '');
  }

  trackByFn(index, item) {    
    return item.id; // unique id corresponding to the item
  }

}
