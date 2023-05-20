import { shallowMount } from '@vue/test-utils'
import MenuLink from './MenuLink.vue'
import { describe, expect, it } from 'vitest'

const menuLinkSelector = '[data-testid=menuLink]'
const menuLinkTextSelector = '[data-testid=menuLinkText]'
const menuLinkIconSelector = '[data-testid=menuLinkIcon]'

const defaultMountOptions = {
    props: {
        to: '/',
        icon: 'icon',
        text: 'menuLink'
    }
}

describe('MenuLink', () => {
    describe('props', () => {
        it('to - should render with set to param on nuxt-link', () => {
            const wrapper = shallowMount(MenuLink, defaultMountOptions);
            expect(wrapper.get(menuLinkSelector).attributes('to')).toBe(defaultMountOptions.props.to)
        })
        it('icon - should render with set icon', () => {
            const wrapper = shallowMount(MenuLink, defaultMountOptions);
            expect(wrapper.get(menuLinkIconSelector).attributes('name')).toBe(defaultMountOptions.props.icon)
        })
        it('text - should render with set text', () => {
            const wrapper = shallowMount(MenuLink, defaultMountOptions);
            expect(wrapper.get(menuLinkTextSelector).text()).toBe(defaultMountOptions.props.text)
        })
    })
    it('snapshot - should match the snapshot', () => {
        const wrapper = shallowMount(MenuLink, defaultMountOptions)
        expect(wrapper.get(menuLinkSelector)).toMatchInlineSnapshot(`
          DOMWrapper {
            "isDisabled": [Function],
            "wrapperElement": <nuxt-link
              class="menu-link w-full py-1"
              data-testid="menuLink"
              to="/"
            >
              <span
                data-testid="menuLinkText"
              >
                menuLink
              </span>
              <icon
                data-testid="menuLinkIcon"
                name="icon"
                size="25px"
              />
            </nuxt-link>,
          }
        `)
    })
})