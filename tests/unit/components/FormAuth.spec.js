import { expect, describe, it, vi, beforeEach } from 'vitest'
import { mount } from '@vue/test-utils'
import FormAuth from '@/components/auth/FormAuth.vue'
import { createRouter, createWebHistory } from 'vue-router'

describe('check FormAuth component', () => {
  it('renders Login props correctly', () => {
    const FormAuthWrapper = mount(FormAuth, {
      props: {
        title: 'Login to tasker',
        btn: 'Login',
        text: 'Not a member?',
        action: 'Register',
        link: '/signup'
      }
    })

    expect(FormAuthWrapper.text()).toContain('Login to tasker')
    expect(FormAuthWrapper.text()).toContain('Login')
    expect(FormAuthWrapper.text()).toContain('Not a member?')
    expect(FormAuthWrapper.text()).toContain('Register')
  })

  it('call handleSubmitLogin when props are for login', async () => {
    const FormAuthWrapper = mount(FormAuth, {
      props: {
        title: 'Login to tasker',
        btn: 'Login',
        text: 'Not a member?',
        action: 'Register',
        link: '/signup'
      }
    })

    const formActionSpy = vi.spyOn(FormAuthWrapper.vm, 'formAction')

    await FormAuthWrapper.find('input[type="text"]').setValue('user23@mail.ru')
    await FormAuthWrapper.find('input[type="password"]').setValue('123456')

    expect(FormAuthWrapper.vm.email).toBe('user23@mail.ru')
    expect(FormAuthWrapper.vm.password).toBe('123456')

    const submitButton = FormAuthWrapper.find('form')
    expect(submitButton.exists()).toBe(true)

    await submitButton.trigger('submit.prevent')
    expect(formActionSpy).toHaveBeenCalled()
  })

  it('renders Sign Up props correctly', () => {
    const FormAuthWrapperSignUp = mount(FormAuth, {
      props: {
        title: 'Sign up to tasker',
        btn: 'Sign Up',
        text: 'Already have an account?',
        action: 'Login',
        link: '/login'
      }
    })
    expect(FormAuthWrapperSignUp.text()).toContain('Sign up to tasker')
    expect(FormAuthWrapperSignUp.text()).toContain('Already have an account?')
    expect(FormAuthWrapperSignUp.text()).toContain('Login')

    const button = FormAuthWrapperSignUp.find('input[type="submit"]')
    expect(button.element.value).toBe('Sign Up')
  })

  it('call handleSubmitSignUp when path props are for signup', async () => {
    const FormAuthWrapper = mount(FormAuth, {
      props: {
        title: 'Sign up to tasker',
        btn: 'Sign Up',
        text: 'Already have an account?',
        action: 'Login',
        link: '/login'
      }
    })

    const formActionSpy = vi.spyOn(FormAuthWrapper.vm, 'formAction')

    await FormAuthWrapper.find('input[type="text"]').setValue('user23@mail.ru')
    await FormAuthWrapper.find('input[type="password"]').setValue('123456')
    const submitButton = FormAuthWrapper.find('form')
    await submitButton.trigger('submit.prevent')

    expect(formActionSpy).toHaveBeenCalled()
  })
})
