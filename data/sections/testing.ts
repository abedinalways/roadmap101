import type { Section } from "@/types";
import {
  bilingual,
  callout,
  checklist,
  code,
  heading,
  para,
} from "../helpers";

const TEST_CODE = `import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { LoginForm } from './LoginForm';

// Mock API call
jest.mock('../api/auth', () => ({
  login: jest.fn()
}));
import { login } from '../api/auth';

describe('LoginForm', () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  it('renders email and password fields', () => {
    render(<LoginForm />);

    expect(screen.getByLabelText(/email/i)).toBeInTheDocument();
    expect(screen.getByLabelText(/password/i)).toBeInTheDocument();
    expect(screen.getByRole('button', { name: /login/i })).toBeInTheDocument();
  });

  it('shows validation error on empty submit', async () => {
    const user = userEvent.setup();
    render(<LoginForm />);

    await user.click(screen.getByRole('button', { name: /login/i }));

    expect(await screen.findByText(/email is required/i)).toBeInTheDocument();
  });

  it('calls login API with correct credentials', async () => {
    const user = userEvent.setup();
    (login as jest.Mock).mockResolvedValueOnce({ token: 'abc123' });

    render(<LoginForm />);

    await user.type(screen.getByLabelText(/email/i), 'test@example.com');
    await user.type(screen.getByLabelText(/password/i), 'password123');
    await user.click(screen.getByRole('button', { name: /login/i }));

    await waitFor(() => {
      expect(login).toHaveBeenCalledWith({
        email: 'test@example.com',
        password: 'password123'
      });
    });
  });

  it('shows loading state during API call', async () => {
    const user = userEvent.setup();
    (login as jest.Mock).mockImplementation(
      () => new Promise(resolve => setTimeout(resolve, 1000))
    );

    render(<LoginForm />);
    await user.click(screen.getByRole('button'));

    expect(screen.getByText(/loading/i)).toBeInTheDocument();
  });
});`;

export const testingSection: Section = {
  id: "testing",
  index: "12",
  icon: "🧪",
  title: "Testing — Jest, RTL, Cypress",
  titleBn: "Code এর quality নিশ্চিত করা — Senior এর signature skill",
  gradient: "from-purple-500/20 to-red-500/10",
  badge: "senior",
  blocks: [
    bilingual(
      "Testing Pyramid — কোন test কতটুকু?",
      "Quality",
      "<strong>Unit Tests (70%):</strong> Individual function বা component test করা। Jest দিয়ে। Fast, isolated।<br/><strong>Integration Tests (20%):</strong> Multiple components একসাথে test করা। React Testing Library দিয়ে। Real user interaction simulate করে।<br/><strong>E2E Tests (10%):</strong> Browser এ পুরো flow test করা। Cypress বা Playwright দিয়ে। Slow কিন্তু most realistic।<br/><br/>Senior developer জানে কোথায় কোন test লিখতে হবে। সব কিছু E2E দিয়ে test করা ভুল — slow হয়, fragile হয়, আর cost বাড়ে।",
      "The Testing Pyramid guides how much of each test type to write. Unit tests are fast and numerous; integration tests verify component cooperation; E2E tests verify user journeys. React Testing Library's philosophy: 'test behavior, not implementation.' Don't test state directly — test what the user sees and does."
    ),
    code("component.test.tsx", "Jest + React Testing Library", TEST_CODE),
    heading("✅ কী test করবে, কী করবে না"),
    para(
      "**Test করবে:** user-facing behavior (render, interaction, error message), business logic (reducers, selectors, utility functions), critical flows (checkout, auth)।<br/><br/>**Test করবে না:** library implementation detail (কোন class name, internal state), third-party library এর ভেতরের কাজ, trivial code (আসলে test করার মতো কিছু না থাকলে)। ৮০% coverage vs ৮০% meaningful test — পরেরটা important।",
      "বাংলা: Test behavior, not implementation। এটাই RTL এর motto — user যেভাবে দেখে ও ব্যবহার করে, test ও সেভাবে।"
    ),
    checklist([
      { text: "Unit test — reducers, selectors, utils (Jest)", bn: "fastest feedback"},
      { text: "Integration test — components + interaction (RTL)", bn: "userEvent দিয়ে"},
      { text: "E2E test — critical journeys (Playwright/Cypress)", bn: "login → dashboard flow"},
      { text: "Mock API calls — network depend করবে না test", bn: "MSW (Mock Service Worker)"},
      { text: "Accessibility test — jest-axe দিয়ে automate", bn: "a11y regression আটকাও"},
      { text: "Coverage দেখো না — meaningful tests দেখো", bn: "80% garbage এর চেয়ে 40% meaningful ভালো"},
    ]),
    callout(
      "warn",
      "⚠️",
      "**Coverage trap:** 100% coverage দিয়ে মনে করো না সব test হয়ে গেছে। Coverage শুধু বলে — কত লাইন run হয়েছে, quality বলে না। ভালো test = **confidence** দেয় refactor করার সময়। যদি test থাকার পরও ভয় লাগে refactor করতে — test ঠিকমতো লেখা হয়নি।",
      "Coverage ≠ Quality",
      "বাংলা: High coverage কিন্তু meaningful test না থাকলে codebase false security তে থাকে।"
    ),
  ],
};
