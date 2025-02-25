import UserCard from '@/components/user-card';
import UsersList from '@/components/users-list';
import { useAppDispatch, useAppSelector } from '@/store';
import { handleToggleEmailMask } from '@/store/usersListSlice';
import { User } from '@/types/user';
import { render, screen } from '@testing-library/react';
import { beforeEach, describe, expect, it, vi } from 'vitest';

// Mock dependencies
vi.mock('@/components/user-card', () => ({
  default: vi.fn(() => <div data-testid="user-card-mock" />),
}));

vi.mock('@/store', () => ({
  useAppDispatch: vi.fn(),
  useAppSelector: vi.fn(),
}));

vi.mock('@/store/usersListSlice', () => ({
  handleToggleEmailMask: vi.fn(),
  selectCurrentUserId: 'selectCurrentUserId',
}));

describe('UsersList', () => {
  const mockUsers: User[] = [
    {
      id: 1,
      email: 'john.doe@example.com',
      first_name: 'John',
      last_name: 'Doe',
      avatar: 'https://example.com/avatar1.jpg',
    },
    {
      id: 2,
      email: 'jane.smith@example.com',
      first_name: 'Jane',
      last_name: 'Smith',
      avatar: 'https://example.com/avatar2.jpg',
    },
  ];

  const mockDispatch = vi.fn();

  // Properly type the mocked functions
  const mockedUseAppDispatch = useAppDispatch as unknown as ReturnType<
    typeof vi.fn
  >;
  const mockedUseAppSelector = useAppSelector as unknown as ReturnType<
    typeof vi.fn
  >;
  const mockedUserCard = UserCard as unknown as ReturnType<typeof vi.fn>;

  beforeEach(() => {
    vi.clearAllMocks();
    mockedUseAppDispatch.mockReturnValue(mockDispatch);
  });

  it('renders a UserCard for each user in the array', () => {
    mockedUseAppSelector.mockReturnValue(null); // No user selected

    render(<UsersList users={mockUsers} />);

    // Check if UserCard is rendered for each user
    expect(mockedUserCard).toHaveBeenCalledTimes(2);
    expect(screen.getAllByTestId('user-card-mock')).toHaveLength(2);
  });

  it('passes correct props to UserCard components', () => {
    mockedUseAppSelector.mockReturnValue(2); // User with ID 2 is selected

    render(<UsersList users={mockUsers} />);

    // Check props for first user
    expect(mockedUserCard).toHaveBeenCalledWith(
      expect.objectContaining({
        id: 1,
        email: 'john.doe@example.com',
        first_name: 'John',
        last_name: 'Doe',
        avatar: 'https://example.com/avatar1.jpg',
        isEmailMasked: true, // Current user ID (2) !== item.id (1)
      }),
      expect.anything(),
    );

    // Check props for second user
    expect(mockedUserCard).toHaveBeenCalledWith(
      expect.objectContaining({
        id: 2,
        email: 'jane.smith@example.com',
        first_name: 'Jane',
        last_name: 'Smith',
        avatar: 'https://example.com/avatar2.jpg',
        isEmailMasked: false, // Current user ID (2) === item.id (2)
      }),
      expect.anything(),
    );
  });

  it('provides onUnmaskEmail callback that dispatches handleToggleEmailMask action', () => {
    mockedUseAppSelector.mockReturnValue(null);

    render(<UsersList users={mockUsers} />);

    // Get the onUnmaskEmail callback from the first UserCard call
    const onUnmaskEmailCallback = mockedUserCard.mock.calls[0][0].onUnmaskEmail;

    // Verify it's a function
    expect(typeof onUnmaskEmailCallback).toBe('function');

    // Call the callback
    onUnmaskEmailCallback();

    // Verify that dispatch was called once
    expect(mockDispatch).toHaveBeenCalledTimes(1);

    // Verify that handleToggleEmailMask was called with the right user ID
    expect(handleToggleEmailMask).toHaveBeenCalledWith(1);
  });

  it('handles empty users array', () => {
    mockedUseAppSelector.mockReturnValue(null);

    render(<UsersList users={[]} />);

    // No UserCard components should be rendered
    expect(mockedUserCard).not.toHaveBeenCalled();
    expect(screen.queryAllByTestId('user-card-mock')).toHaveLength(0);
  });
});
