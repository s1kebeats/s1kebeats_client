import InstagramLink from "./InstagramLink.vue";
import { describe, expect, it } from 'vitest';
import { mount } from '@vue/test-utils';

const instagramIconSelector = '[data-testid=icon]';
const instagramLinkSelector = '[data-testid=link]';

describe('InstagramLink', () => {
    it('renders with set size and username', () => {
        const testUsername = 'test'
        const testWidth = '100px'
        const testHeight = '100px'

        const wrapper = mount(InstagramLink, {
            props: {
                username: testUsername,
                width: testWidth,
                height: testHeight
            }
        })

        expect(wrapper.get(instagramLinkSelector).attributes('href')).toBe(`https://www.instagram.com/${testUsername}`)
        expect(wrapper.get(instagramIconSelector).attributes('width')).toBe(testWidth)
        expect(wrapper.get(instagramIconSelector).attributes('height')).toBe(testHeight)
    })
})