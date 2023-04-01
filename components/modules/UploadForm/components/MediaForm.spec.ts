import MediaForm from './MediaForm.vue';
import { describe, it, expect } from 'vitest';
import { mount } from '@vue/test-utils';
import { createTestingPinia } from '@pinia/testing';
import useUploadStore from '../store';

const mp3InputSelector = '[data-testid=mp3Input]';
const waveInputSelector = '[data-testid=waveInput]';
const imageInputSelector = '[data-testid=imageInput]';
const stemsInputSelector = '[data-testid=stemsInput]';
const nextButtonSelector = '[data-testid=nextButton]';
const backButtonSelector = '[data-testid=backButton]';
const fillMessageSelector = '[data-testid=fillMessage]';

describe('MediaForm', () => {
  it('does not render stems input when uploadVersion is set to default', () => {
    const wrapper = mount(MediaForm, {
      global: {
        plugins: [
          createTestingPinia({
            initialState: {
              upload: {
                uploadVersion: 'default',
              },
            },
          }),
        ],
      },
    });

    expect(wrapper.find(stemsInputSelector).exists()).toBe(false);
  });
  it('renders stems input when uploadVersion is set to extended', () => {
    const wrapper = mount(MediaForm, {
      global: {
        plugins: [
          createTestingPinia({
            initialState: {
              upload: {
                uploadVersion: 'extended',
              },
            },
          }),
        ],
      },
    });

    expect(wrapper.find(stemsInputSelector).exists()).toBe(true);
  });
  it('does not switch page when mp3 is not filled', async () => {
    const wrapper = mount(MediaForm, {
      global: {
        plugins: [
          createTestingPinia({
            stubActions: false,
            initialState: {
              upload: {
                page: 2,
                uploadVersion: 'default',
                beat: {
                  mp3: null,
                  wave: 'path/to/file',
                  image: 'path/to/file',
                  stems: 'path/to/file',
                },
              },
            },
          }),
        ],
      },
    });
    const uploadStore = useUploadStore();

    await wrapper.get(nextButtonSelector).trigger('click');
    expect(uploadStore.page).toBe(2);
  });
  it('does not switch page when wave is not filled', async () => {
    const wrapper = mount(MediaForm, {
      global: {
        plugins: [
          createTestingPinia({
            stubActions: false,
            initialState: {
              upload: {
                page: 2,
                uploadVersion: 'default',
                beat: {
                  mp3: 'path/to/file',
                  wave: null,
                  image: 'path/to/file',
                  stems: 'path/to/file',
                },
              },
            },
          }),
        ],
      },
    });
    const uploadStore = useUploadStore();

    await wrapper.get(nextButtonSelector).trigger('click');
    expect(uploadStore.page).toBe(2);
  });
  it('does not switch page when stems are not filled and extended upload version is set', async () => {
    const wrapper = mount(MediaForm, {
      global: {
        plugins: [
          createTestingPinia({
            stubActions: false,
            initialState: {
              upload: {
                page: 2,
                uploadVersion: 'extended',
                beat: {
                  mp3: 'path/to/file',
                  wave: 'path/to/file',
                  image: 'path/to/file',
                  stems: null,
                },
              },
            },
          }),
        ],
      },
    });
    const uploadStore = useUploadStore();

    await wrapper.get(nextButtonSelector).trigger('click');
    expect(uploadStore.page).toBe(2);
  });
  // it('switches page when mp3, wave and image are filled in default uploadVersion', async () => {
  //   const wrapper = mount(MediaForm, {
  //     global: {
  //       plugins: [
  //         createTestingPinia({
  //           stubActions: false,
  //           initialState: {
  //             upload: {
  //               uploadVersion: 'default',
  //               beat: {
  //                 mp3: 'path/to/file',
  //                 wave: 'path/to/file',
  //                 image: 'path/to/file',
  //                 stems: null,
  //               },
  //             },
  //           },
  //         }),
  //       ],
  //     },
  //   });
  //   const uploadStore = useUploadStore();

  //   await wrapper.get(nextButtonSelector).trigger('click');
  //   expect(uploadStore.page).toBe(3);
  // });
  // it('switches page when mp3, wave, stems are filled in extended uploadVersion', async () => {
  //   const wrapper = mount(MediaForm, {
  //     global: {
  //       plugins: [
  //         createTestingPinia({
  //           stubActions: false,
  //           initialState: {
  //             upload: {
  //               uploadVersion: 'extended',
  //             },
  //           },
  //         }),
  //       ],
  //     },
  //   });
  //   const uploadStore = useUploadStore();

  //   await wrapper.get(mp3InputSelector).find('input').setValue('path/to/file');
  //   await wrapper.get(waveInputSelector).find('input').setValue('path/to/file');
  //   await wrapper
  //     .get(imageInputSelector)
  //     .find('input')
  //     .setValue('path/to/file');
  //   await wrapper
  //     .get(stemsInputSelector)
  //     .find('input')
  //     .setValue('path/to/file');

  //   await wrapper.get(nextButtonSelector).trigger('click');
  //   expect(uploadStore.page).toBe(3);
  // });
  it('shows fill message and changes inputs style when media is not filled', async () => {
    const wrapper = mount(MediaForm, {
      global: {
        plugins: [
          createTestingPinia({
            stubActions: false,
            initialState: {
              upload: {
                uploadVersion: 'extended',
              },
            },
          }),
        ],
      },
    });

    await wrapper.get(nextButtonSelector).trigger('click');
    expect(wrapper.find(fillMessageSelector).exists()).toBe(true);
    expect(wrapper.get(mp3InputSelector).classes()).toContain('border-red-500');
    expect(wrapper.get(waveInputSelector).classes()).toContain(
      'border-red-500'
    );
    expect(wrapper.get(stemsInputSelector).classes()).toContain(
      'border-red-500'
    );
  });
  it('back button decrements the page', async () => {
    const wrapper = mount(MediaForm, {
      global: {
        plugins: [
          createTestingPinia({
            stubActions: false,
            initialState: {
              upload: {
                page: 2,
                uploadVersion: 'extended',
              },
            },
          }),
        ],
      },
    });
    const uploadStore = useUploadStore();

    await wrapper.get(backButtonSelector).trigger('click');
    expect(uploadStore.page).toBe(1);
  });
});
