import MediaInputVue from './MediaInput.vue';
import { describe, expect, it, vi } from 'vitest';
import { shallowMount } from '@vue/test-utils';
import { createTestingPinia } from '@pinia/testing';
import User from '@/api/models/User';
