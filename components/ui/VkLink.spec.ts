import VkLink from './VkLink.vue';
import { describe, expect, it } from 'vitest';
import { mount } from '@vue/test-utils';

const vkIconSelector = '[data-testid=icon]';
const vkLinkSelector = '[data-testid=link]';

describe('VkLink', () => {
    it('renders with set size and username', () => {
        const testUsername = 'test'
        const testWidth = '100px'
        const testHeight = '100px'

        const wrapper = mount(VkLink, {
            props: {
                username: testUsername,
                width: testWidth,
                height: testHeight
            }
        })

        expect(wrapper.get(vkLinkSelector).attributes('href')).toBe(`https://vk.com/${testUsername}`)
        expect(wrapper.get(vkIconSelector).attributes('width')).toBe(testWidth)
        expect(wrapper.get(vkIconSelector).attributes('height')).toBe(testHeight)
    })
})