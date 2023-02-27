import LoadingSpinner from "./LoadingSpinner.vue";
import { describe, expect, it } from 'vitest';
import { mount } from '@vue/test-utils';

const loadingSpinnerSelector = '[data-testid=spinner]'

describe('LoadingSpinner', async () => {
    it('renders with default color and size values', () => {
        const wrapper = mount(LoadingSpinner)

        expect(wrapper.get(loadingSpinnerSelector).classes()).toContain('border-[rgba(255,255,255,1)]')
        expect(wrapper.get(loadingSpinnerSelector).classes()).toContain('w-[20px]')
        expect(wrapper.get(loadingSpinnerSelector).classes()).toContain('h-[20px]')
    })
    it('renders with "color" prop set to "black" and "size" prop set to "lg"', () => {
        const wrapper = mount(LoadingSpinner, {
            props: {
                color: 'black',
                size: 'lg'
            }
        })

        expect(wrapper.get(loadingSpinnerSelector).classes()).toContain('border-[rgba(0,0,0,1)]')
        expect(wrapper.get(loadingSpinnerSelector).classes()).toContain('w-[25px]')
        expect(wrapper.get(loadingSpinnerSelector).classes()).toContain('h-[25px]')
    })
    it('renders properly with "size" prop set to "sm"', () => {
        const wrapper = mount(LoadingSpinner, {
            props: {
                size: 'sm'
            }
        })

        expect(wrapper.get(loadingSpinnerSelector).classes()).toContain('w-[15px]')
        expect(wrapper.get(loadingSpinnerSelector).classes()).toContain('h-[15px]')
    })
})