export type IntegrationStatus = 'in-progress' | 'planned';

export interface Integration {
  name: string;
  status: IntegrationStatus;
  /** What Scalar will read or write once the integration ships. */
  syncs: string[];
}

export interface Phase {
  id: string;
  label: string;
  summary: string;
  integrations: Integration[];
}

export const statusLabel: Record<IntegrationStatus, string> = {
  'in-progress': 'In progress',
  planned: 'Planned',
};

/**
 * Honest status of every integration. Nothing here ships today. "In progress" means the
 * connector is being built in the open (a public branch or PR exists); "Planned" means it is on the
 * roadmap only. Flip a status here when work actually starts.
 */
export const phases: Phase[] = [
  {
    id: 'phase-1',
    label: 'Phase 1',
    summary:
      'Next up. The minimum needed for a useful Today screen for a student or knowledge worker.',
    integrations: [
      {
        name: 'Gmail',
        status: 'planned',
        syncs: [
          'Read threads and labels to surface messages that need a reply',
          'Draft replies for you to review and send',
          'Archive or label from Scalar',
        ],
      },
      {
        name: 'Google Calendar',
        status: 'planned',
        syncs: [
          'Read events to build the Upcoming list and find free time',
          'Create and move focus blocks when you accept a plan',
        ],
      },
      {
        name: 'Canvas LMS',
        status: 'planned',
        syncs: [
          'Courses become Spaces',
          'Assignments and due dates become tasks with estimated effort',
          'Announcements and grades appear in the relevant Space',
        ],
      },
    ],
  },
  {
    id: 'phase-2',
    label: 'Phase 2',
    summary: 'The same three capabilities for Microsoft and other learning platforms.',
    integrations: [
      { name: 'Outlook', status: 'planned', syncs: ['Mail read, draft, archive'] },
      { name: 'Microsoft Calendar', status: 'planned', syncs: ['Events read, focus blocks write'] },
      { name: 'Blackboard', status: 'planned', syncs: ['Courses, assignments, due dates'] },
      { name: 'Moodle', status: 'planned', syncs: ['Courses, assignments, due dates'] },
      { name: 'Brightspace', status: 'planned', syncs: ['Courses, assignments, due dates'] },
    ],
  },
  {
    id: 'phase-3',
    label: 'Phase 3',
    summary: 'Work tools and files, so projects and their context live in one place.',
    integrations: [
      { name: 'Slack', status: 'planned', syncs: ['Mentions and DMs that need a reply'] },
      { name: 'GitHub', status: 'planned', syncs: ['Assigned issues, review requests, PR status'] },
      { name: 'Linear', status: 'planned', syncs: ['Assigned issues and cycles as tasks'] },
      { name: 'Notion', status: 'planned', syncs: ['Pages linked to a Space, search'] },
      { name: 'Google Drive', status: 'planned', syncs: ['Files linked to tasks and Spaces'] },
      { name: 'OneDrive', status: 'planned', syncs: ['Files linked to tasks and Spaces'] },
    ],
  },
];
