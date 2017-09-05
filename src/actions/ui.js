import { TOGGLE_DRAWER,SET_SIDEBAR } from './action-types';

export const toggleDrawer =  () => ({
    type:TOGGLE_DRAWER,
});

export const setSidebar = (facility) => ({
    type:SET_SIDEBAR,
    facility,
})