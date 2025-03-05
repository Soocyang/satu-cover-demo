import { describe, it, expect, vi, beforeEach } from 'vitest';
import { render, screen, fireEvent } from '@testing-library/react';
import UsersList from '@/components/users-list';
import * as storeHooks from '@/store';
import * as usersListSlice from '@/store/usersListSlice';

// Mock the UserCard component
vi.mock('@/components/user-card', () => ({
  default: ({
    id,
    email,
    first_name,
    last_name,
    isEmailMasked,
    isLoading,
    onUnmaskEmail,
  }: {
    id: number;
    email: string;
    first_name: string;
    last_name: string;
    isEmailMasked: boolean;
    isLoading: boolean;
    onUnmaskEmail: () => void;
  }) => (
    <div data-testid={`user-card-${id}`}>
      <div data-testid={`user-${id}-name`}>
        {first_name} {last_name}
      </div>
      <div data-testid={`user-${id}-email`}>{email}</div>
      <div data-testid={`user-${id}-masked`}>{isEmailMasked.toString()}</div>
      <div data-testid={`user-${id}-loading`}>{isLoading.toString()}</div>
      <button data-testid={`unmask-button-${id}`} onClick={onUnmaskEmail}>
        Unmask Email
      </button>
    </div>
  ),
}));

// Mock Redux hooks
vi.mock('@/store', () => ({
  useAppDispatch: vi.fn(),
  useAppSelector: vi.fn(),
}));

// Mock Redux actions and selectors
vi.mock('@/store/usersListSlice', () => ({
  fetchUserById: vi.fn((id) => ({ type: 'users/fetchUserById', payload: id })),
  resetUnmaskedUser: vi.fn(() => ({ type: 'users/resetUnmaskedUser' })),
  selectUnmaskedUser: vi.fn(),
  selectIsLoading: vi.fn(),
  selectLoadingUserId: vi.fn(),
}));

// Mock data
const mockUsers = [
  {
    id: 1,
    email: '****@example.com',
    first_name: 'George',
    last_name: 'Walker',
    avatar: 'https://example.com/avatar1.png',
  },
  {
    id: 2,
    email: '****@example.com',
    first_name: 'Grace',
    last_name: 'Smith',
    avatar: 'https://example.com/avatar2.png',
  },
];

describe('UsersList Component', () => {
  const mockDispatch = vi.fn();

  beforeEach(() => {
    vi.clearAllMocks();
    vi.mocked(storeHooks.useAppDispatch).mockReturnValue(mockDispatch);
  });

  it('renders all user cards with masked emails', () => {
    // Setup selectors for this test
    vi.mocked(storeHooks.useAppSelector).mockImplementation((selector) => {
      if (selector === usersListSlice.selectUnmaskedUser) return null;
      if (selector === usersListSlice.selectIsLoading) return false;
      if (selector === usersListSlice.selectLoadingUserId) return null;
      return undefined;
    });

    render(<UsersList users={mockUsers} />);

    // Check if all user cards are rendered
    expect(screen.getByTestId('user-card-1')).toBeInTheDocument();
    expect(screen.getByTestId('user-card-2')).toBeInTheDocument();

    // Check user names and emails
    expect(screen.getByTestId('user-1-name').textContent).toBe('George Walker');
    expect(screen.getByTestId('user-1-email').textContent).toBe(
      '****@example.com',
    );
    expect(screen.getByTestId('user-1-masked').textContent).toBe('true');
  });

  it('dispatches fetchUserById when unmask button is clicked', () => {
    // Setup selectors for this test
    vi.mocked(storeHooks.useAppSelector).mockImplementation((selector) => {
      if (selector === usersListSlice.selectUnmaskedUser) return null;
      if (selector === usersListSlice.selectIsLoading) return false;
      if (selector === usersListSlice.selectLoadingUserId) return null;
      return undefined;
    });

    render(<UsersList users={mockUsers} />);

    // Click the unmask button for user 1
    fireEvent.click(screen.getByTestId('unmask-button-1'));

    // Check if the correct action was dispatched
    expect(mockDispatch).toHaveBeenCalledWith(usersListSlice.fetchUserById(1));
  });

  it('displays unmasked email for the selected user', () => {
    // Mock unmasked user state
    const unmaskedUser = {
      id: 1,
      email: 'mike@example.com',
      first_name: 'George',
      last_name: 'Walker',
      avatar: 'https://example.com/avatar1.png',
    };

    vi.mocked(storeHooks.useAppSelector).mockImplementation((selector) => {
      if (selector === usersListSlice.selectUnmaskedUser) return unmaskedUser;
      if (selector === usersListSlice.selectIsLoading) return false;
      if (selector === usersListSlice.selectLoadingUserId) return null;
      return undefined;
    });

    render(<UsersList users={mockUsers} />);

    // Check if unmasked email is displayed
    expect(screen.getByTestId('user-1-email').textContent).toBe(
      'mike@example.com',
    );
    expect(screen.getByTestId('user-1-masked').textContent).toBe('false');
  });

  it('dispatches resetUnmaskedUser when clicking on already unmasked user', () => {
    // Mock unmasked user state
    const unmaskedUser = {
      id: 1,
      email: 'mike@example.com',
      first_name: 'George',
      last_name: 'Walker',
      avatar: 'https://example.com/avatar1.png',
    };

    vi.mocked(storeHooks.useAppSelector).mockImplementation((selector) => {
      if (selector === usersListSlice.selectUnmaskedUser) return unmaskedUser;
      if (selector === usersListSlice.selectIsLoading) return false;
      if (selector === usersListSlice.selectLoadingUserId) return null;
      return undefined;
    });

    render(<UsersList users={mockUsers} />);

    // Click the unmask button for the already unmasked user
    fireEvent.click(screen.getByTestId('unmask-button-1'));

    // Check if the reset action was dispatched
    expect(mockDispatch).toHaveBeenCalledWith(
      usersListSlice.resetUnmaskedUser(),
    );
  });

  it('shows loading state for the correct user', () => {
    // Mock loading state for user 2
    vi.mocked(storeHooks.useAppSelector).mockImplementation((selector) => {
      if (selector === usersListSlice.selectUnmaskedUser) return null;
      if (selector === usersListSlice.selectIsLoading) return true;
      if (selector === usersListSlice.selectLoadingUserId) return 2;
      return undefined;
    });

    render(<UsersList users={mockUsers} />);

    // Check if loading state is correctly applied
    expect(screen.getByTestId('user-1-loading').textContent).toBe('false');
    expect(screen.getByTestId('user-2-loading').textContent).toBe('true');
  });
});
