import AuthorInfo from './AuthorInfo.vue';
import { describe, it, expect } from 'vitest';
import { ComponentMountingOptions, shallowMount } from '@vue/test-utils';
import { AuthorIndividualStaticMock } from '@/testing/mocks/AuthorIndividual.mock';

const editButtonSelector = '[data-testid=editButton]';
const presentationalAvatarSelector = '[data-testid=presentationalAvatar]';
const authorNameSelector = '[data-testid=authorName]';
const socialsSelector = '[data-testid=socials]';
const aboutWrapperSelector = '[data-testid=aboutWrapper]';
const aboutSelector = '[data-testid=about]';
const editIconSelector = '[data-testid=editIcon]';

const defaultMountOptions: ComponentMountingOptions<typeof AuthorInfo> = {
  props: {
    author: AuthorIndividualStaticMock,
  },
};

describe('AuthorInfo', () => {
  describe('props', () => {
    it('showEdit - should not render edit button by default', () => {
      const wrapper = shallowMount(AuthorInfo, defaultMountOptions);
      expect(wrapper.find(editButtonSelector).exists()).toBe(false);
    });
    it('showEdit - should render edit button when set to "true"', () => {
      const wrapper = shallowMount(AuthorInfo, {
        props: {
          ...defaultMountOptions.props!,
          showEdit: true,
        },
      });
      expect(wrapper.find(editButtonSelector).exists()).toBe(true);
    });
    it('author - should render presentationalAvatar with set author username', () => {
      const wrapper = shallowMount(AuthorInfo, defaultMountOptions);
      expect(
        wrapper.get(presentationalAvatarSelector).attributes('username')
      ).toBe(AuthorIndividualStaticMock.username);
    });
    it('author - should render with set author displayed name if provided', () => {
      const wrapper = shallowMount(AuthorInfo, defaultMountOptions);
      expect(wrapper.get(authorNameSelector).text()).toBe(
        AuthorIndividualStaticMock.displayedName
      );
    });
    it('author - should render with set author username when displayedName is not provided', () => {
      const wrapper = shallowMount(AuthorInfo, {
        props: {
          author: {
            ...defaultMountOptions.props!.author,
            displayedName: null,
          },
        },
      });
      expect(wrapper.get(authorNameSelector).text()).toBe(
        AuthorIndividualStaticMock.username
      );
    });
    // TODO: shallowMount stringifies object attributes, don't know how to check them + currently removed
    it.todo('author - should render socials with set author', () => {
      const wrapper = shallowMount(AuthorInfo, defaultMountOptions);
      expect(wrapper.get(socialsSelector).attributes('author')).toBe(
        AuthorIndividualStaticMock
      );
    });
    it('author - should not render author about if not provided', () => {
      const wrapper = shallowMount(AuthorInfo, {
        props: {
          author: {
            ...defaultMountOptions.props!.author,
            about: null,
          },
        },
      });
      expect(wrapper.find(aboutWrapperSelector).exists()).toBe(false);
    });
    it('author - should render author about when provided', () => {
      const wrapper = shallowMount(AuthorInfo, defaultMountOptions);
      expect(wrapper.find(aboutWrapperSelector).exists()).toBe(true);
    });
    it('author - should render set author about', () => {
      const wrapper = shallowMount(AuthorInfo, defaultMountOptions);
      expect(wrapper.get(aboutSelector).text()).toBe(
        defaultMountOptions.props!.author.about
      );
    });
  });
  describe('User Interactions', () => {
    it('about click - should toggle about "multiline" class', async () => {
      const wrapper = shallowMount(AuthorInfo, defaultMountOptions);
      expect(wrapper.get(aboutSelector).classes()).toContain('multiline');
      await wrapper.get(aboutWrapperSelector).trigger('click');
      expect(wrapper.get(aboutSelector).classes()).not.toContain('multiline');
    });
    it('about click - should toggle edit icon "rotate-180" class', async () => {
      const wrapper = shallowMount(AuthorInfo, defaultMountOptions);
      expect(wrapper.get(editIconSelector).classes()).not.toContain(
        'rotate-180'
      );
      await wrapper.get(aboutWrapperSelector).trigger('click');
      expect(wrapper.get(editIconSelector).classes()).toContain('rotate-180');
    });
  });
  it('snapshot - should match the snapshot', () => {
    const wrapper = shallowMount(AuthorInfo, defaultMountOptions);
    expect(wrapper.element).toMatchInlineSnapshot(`
      <section
        class="w-full mt-3 px-[3%]"
        data-v-a524e9b4=""
      >
        <div
          class="border-[1px] rounded-lg overflow-hidden"
          data-v-a524e9b4=""
        >
          <div
            class="bg-image px-[5%] flex items-end pb-3 justify-between"
            data-v-a524e9b4=""
          >
            <presentational-avatar-stub
              class="translate-y-1/4 w-[35%] desktop-text-lg"
              data-testid="presentationalAvatar"
              data-v-a524e9b4=""
              image="/path/to/image"
              size="custom"
              username="username"
            />
            <!--v-if-->
          </div>
          <div
            class="flex flex-col gap-3 pb-3 pt-[7.5%] px-[5%]"
            data-v-a524e9b4=""
          >
            <div
              class="flex items-center justify-between"
              data-v-a524e9b4=""
            >
              <div
                class="link desktop-text-md truncate"
                data-testid="authorName"
                data-v-a524e9b4=""
              >
                displayed name
              </div>
              <socials-stub
                author="[object Object]"
                data-testid="socials"
                data-v-a524e9b4=""
              />
            </div>
            <div
              class="cursor-pointer flex items-start"
              data-testid="aboutWrapper"
              data-v-a524e9b4=""
            >
              <div
                class="text-left desktop-text-xs multiline"
                data-testid="about"
                data-v-a524e9b4=""
              >
                about
              </div>
              <button
                data-v-a524e9b4=""
              >
                <anonymous-stub
                  class="transition-all text-[23px]"
                  data-testid="editIcon"
                  data-v-a524e9b4=""
                  icon="ic:baseline-keyboard-arrow-down"
                />
              </button>
            </div>
          </div>
        </div>
      </section>
    `);
  });
});
