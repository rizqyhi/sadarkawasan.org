import { mount, createLocalVue } from '@vue/test-utils'
import VueRouter from 'vue-router'
import MainNav from '@/components/MainNav.vue'

const localVue = createLocalVue()
localVue.use(VueRouter)

const router = new VueRouter()
const menus = [
  { route: '/home', name: 'Peta Kawasan' },
  { route: '/about', name: 'Tentang' },
]
let wrapper

beforeEach(() => {
  wrapper = mount(MainNav, {
    propsData: {
      menus
    },
    stubs: ['b-nav'],
    localVue,
    router
  })
})

describe('Showing app navigation', () => {
  it('render app name', () => {
    expect(wrapper.contains('.app-title')).toBe(true)
  })

  it('render menu items from props', () => {
    expect(wrapper.findAll('.app-nav a')).toHaveLength(2)
  })

  it('render the link to the menu item correctly', () => {
    expect(wrapper.find('.app-nav a').html()).toMatch('href="#/home"')
  })

  describe('when a menu item is clicked', () => {
    it('should update current route', () => {
      wrapper.find('.app-nav a').trigger('click')

      expect(wrapper.vm.$route.path).toMatch(menus[0].route)
    })

    it('should add active class to the clicked menu', () => {
      wrapper.find('.app-nav a').trigger('click')

      expect(wrapper.find('.app-nav a').classes()).toContain('router-link-exact-active')
    })

    it('should remove active class from other menu items', () => {
      wrapper.find('.app-nav a').trigger('click')
      wrapper.find('.app-nav li:nth-child(2) a').trigger('click')

      expect(wrapper.find('.app-nav a').classes()).not.toContain('router-link-exact-active')
    })
  })
})
