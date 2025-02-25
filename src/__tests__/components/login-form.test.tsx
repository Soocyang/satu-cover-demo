import { LoginForm } from '@/components/login-form';
import { render, screen } from '@testing-library/react';
import { ClassAttributes, ImgHTMLAttributes, JSX } from 'react';
import { beforeEach, describe, expect, it, vi } from 'vitest';

vi.mock('@/auth', () => ({
  signIn: vi.fn(),
}));

vi.mock('next/image', () => ({
  default: (
    props: JSX.IntrinsicAttributes &
      ClassAttributes<HTMLImageElement> &
      ImgHTMLAttributes<HTMLImageElement>,
    // eslint-disable-next-line @next/next/no-img-element, jsx-a11y/alt-text
  ) => <img {...props} />,
}));

describe('LoginForm', () => {
  beforeEach(() => {
    vi.clearAllMocks();
  });

  it('renders the component correctly', () => {
    render(<LoginForm />);

    expect(screen.getByText('Welcome back')).toBeInTheDocument();
    expect(screen.getByText('Login to your account')).toBeInTheDocument();
    expect(screen.getByText('SatuCover')).toBeInTheDocument();
    expect(screen.getByText('Login with Google')).toBeInTheDocument();

    expect(screen.getByAltText('logo image')).toBeInTheDocument();
    expect(screen.getByAltText('Image')).toBeInTheDocument();

    expect(screen.getByText('Terms of Service')).toBeInTheDocument();
    expect(screen.getByText('Privacy Policy')).toBeInTheDocument();
  });

  it('accepts and applies additional className prop', () => {
    const { container } = render(<LoginForm className="test-class" />);

    expect(container.firstChild).toHaveClass('test-class');
  });

  it('includes a form with Google authentication button', () => {
    render(<LoginForm />);

    const loginButton = screen.getByText('Login with Google');
    expect(loginButton).toBeInTheDocument();

    const form = loginButton.closest('form');
    expect(form).toBeInTheDocument();
  });
});
