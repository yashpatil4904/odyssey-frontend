import { Challenge } from '../types';

export const challenges: Challenge[] = [
  // Arrays
  {
    id: 'two-sum',
    title: 'Two Sum',
    description: 'Find two numbers in an array that add up to a target sum',
    topic: 'Arrays',
    difficulty: 'Easy',
    type: 'regular',
    problemStatement: `Given an array of integers nums and an integer target, return indices of the two numbers such that they add up to target.
You may assume that each input would have exactly one solution, and you may not use the same element twice.
You can return the answer in any order.`,
    examples: [
      {
        input: 'nums = [2,7,11,15], target = 9',
        output: '[0,1]',
        explanation: 'Because nums[0] + nums[1] == 9, we return [0, 1].'
      }
    ],
    constraints: [
      '2 <= nums.length <= 104',
      '-109 <= nums[i] <= 109',
      '-109 <= target <= 109',
      'Only one valid answer exists.'
    ],
    starterCode: {
      javascript: `function twoSum(nums, target) {
    // Your code here
};`,
      typescript: `function twoSum(nums: number[], target: number): number[] {
    // Your code here
};`,
      python: `def twoSum(nums: List[int], target: int) -> List[int]:
    # Your code here`
    }
  },
  // Add more array challenges here
  
  // Linked Lists
  {
    id: 'reverse-linked-list',
    title: 'Reverse Linked List',
    description: 'Reverse a singly linked list',
    topic: 'Linked Lists',
    difficulty: 'Easy',
    type: 'regular',
    problemStatement: `Given the head of a singly linked list, reverse the list, and return the reversed list.`,
    examples: [
      {
        input: 'head = [1,2,3,4,5]',
        output: '[5,4,3,2,1]'
      }
    ],
    constraints: [
      'The number of nodes in the list is the range [0, 5000]',
      '-5000 <= Node.val <= 5000'
    ],
    starterCode: {
      javascript: `function reverseList(head) {
    // Your code here
};`,
      typescript: `function reverseList(head: ListNode | null): ListNode | null {
    // Your code here
};`,
      python: `def reverseList(self, head: Optional[ListNode]) -> Optional[ListNode]:
    # Your code here`
    }
  },
  // Add more challenges for each data structure...
];