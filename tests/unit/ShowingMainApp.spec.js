import { mount, createLocalVue } from '@vue/test-utils'
import VueRouter from 'vue-router'
import App from '@/App'
import MainNav from '@/components/MainNav'

const localVue = createLocalVue()
localVue.use(VueRouter)

const router = new VueRouter()
const menus = [
  { route: 'home', name: 'Peta Kawasan' },
  { route: 'about', name: 'Tentang' }
]
let wrapper

beforeEach(() => {
  wrapper = mount(App, {
    propsData: { menus },
    router,
    localVue,
    stubs: ['router-view', 'b-container', 'b-row', 'b-col', 'b-nav']
  })
})

describe('Showing main app', () => {
  describe('render main navigation component', () => {
    it('has menus data', () => {
      expect(wrapper.vm.menus).not.toBeUndefined()
    })

    it('render main navigation component', () => {
      expect(wrapper.find(MainNav).exists()).toBe(true)
    })
  })

  it('render <router-view> component', () => {
    expect(wrapper.find('router-view-stub').exists()).toBe(true)
  })
})
