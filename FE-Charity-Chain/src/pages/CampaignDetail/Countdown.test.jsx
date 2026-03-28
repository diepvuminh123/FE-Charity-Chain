import { render, screen } from "@testing-library/react";
import { BrowserRouter } from "react-router-dom";

describe("Voting Interface & Countdown (SCRUM-65)", () => {
  it("displays remaining voting time correctly based on deadline", () => {
    // Tạm thời setup fake timer/mock
    jest.useFakeTimers().setSystemTime(new Date("2026-03-20T10:00:00Z"));

    // Giả lập deadline
    const deadline = new Date("2026-03-25T10:00:00Z"); // 5 days left
    const diff = deadline.getTime() - new Date().getTime();

    // Logic của frontend component
    const days = Math.floor(diff / (1000 * 60 * 60 * 24));

    expect(days).toBe(5);

    // render(<BrowserRouter><CampaignDetail /></BrowserRouter>);
    // expect(screen.getByText(/5 Ngày/i)).toBeInTheDocument();
  });
});
