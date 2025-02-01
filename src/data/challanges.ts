import { Challenge } from '../types';

export const challenges: Challenge[] = [
  // Daily Challenges
  {
    id: 'daily-1',
    title: 'Maximum Subarray',
    description: 'Find the contiguous subarray with the largest sum',
    topic: 'Arrays',
    difficulty: 'Medium',
    type: 'daily',
    problemStatement: `Given an integer array nums, find the subarray with the largest sum, and return its sum.`,
    examples: [
      {
        input: 'nums = [-2,1,-3,4,-1,2,1,-5,4]',
        output: '6',
        explanation: 'The subarray [4,-1,2,1] has the largest sum 6.'
      }
    ],
    constraints: [
      '1 <= nums.length <= 105',
      '-104 <= nums[i] <= 104'
    ],
    starterCode: {
      javascript: `function maxSubArray(nums) {\n    // Your code here\n}`,
      typescript: `function maxSubArray(nums: number[]): number {\n    // Your code here\n}`,
      python: `def maxSubArray(nums: List[int]) -> int:\n    # Your code here`,
      java: `class Solution {
    public int maxSubArray(int[] nums) {
        // Your code here
    }
}`,
      cpp: `class Solution {
public:
    int maxSubArray(vector<int>& nums) {
        // Your code here
    }
};`,
      c: `int maxSubArray(int* nums, int numsSize) {
    // Your code here
}`,
      csharp: `public class Solution {
    public int MaxSubArray(int[] nums) {
        // Your code here
    }
}`,
      go: `func maxSubArray(nums []int) int {
    // Your code here
}`,
      rust: `impl Solution {
    pub fn max_sub_array(nums: Vec<i32>) -> i32 {
        // Your code here
    }
}`,
      php: `class Solution {
    function maxSubArray($nums) {
        // Your code here
    }
}`
    }
  },
  {
    id: 'daily-2',
    title: 'Valid Parentheses',
    description: 'Check if string has valid parentheses',
    topic: 'Stacks',
    difficulty: 'Easy',
    type: 'daily',
    problemStatement: `Given a string s containing just the characters '(', ')', '{', '}', '[' and ']', determine if the input string is valid.`,
    examples: [
      {
        input: 's = "()"',
        output: 'true',
        explanation: 'The string is valid because the parentheses are closed in the correct order.'
      },
      {
        input: 's = "(]"',
        output: 'false',
        explanation: 'The string is invalid because the parentheses are not closed in the correct order.'
      }
    ],
    constraints: [
      '1 <= s.length <= 104',
      's consists of parentheses only "(){}" or "()[]{}".'
    ],
    starterCode: {
      javascript: `function isValid(s) {\n    // Your code here\n}`,
      typescript: `function isValid(s: string): boolean {\n    // Your code here\n}`,
      python: `def isValid(s: str) -> bool:\n    # Your code here`,
      java: `class Solution {
    public boolean isValid(String s) {
        // Your code here
    }
}`,
      cpp: `class Solution {
public:
    bool isValid(string s) {
        // Your code here
    }
};`,
      c: `bool isValid(char* s) {
    // Your code here
}`,
      csharp: `public class Solution {
    public bool IsValid(string s) {
        // Your code here
    }
}`,
      go: `func isValid(s string) bool {
    // Your code here
}`,
      rust: `impl Solution {
    pub fn is_valid(s: String) -> bool {
        // Your code here
    }
}`,
      php: `class Solution {
    function isValid($s) {
        // Your code here
    }
}`
    }
  },
  {
    id: 'daily-3',
    title: 'Binary Tree Level Order',
    description: 'Traverse binary tree in level order',
    topic: 'Trees',
    difficulty: 'Medium',
    type: 'daily',
    problemStatement: `Given the root of a binary tree, return the level order traversal of its nodes' values.`,
    examples: [
      {
        input: 'root = [3,9,20,null,null,15,7]',
        output: '[[3],[9,20],[15,7]]',
        explanation: 'The level order traversal of the binary tree is [[3],[9,20],[15,7]].'
      }
    ],
    constraints: [
      'The number of nodes in the tree is in the range [0, 2000].',
      '-1000 <= Node.val <= 1000'
    ],
    starterCode: {
      javascript: `function levelOrder(root) {\n    // Your code here\n}`,
      typescript: `function levelOrder(root: TreeNode | null): number[][] {\n    // Your code here\n}`,
      python: `def levelOrder(self, root: Optional[TreeNode]) -> List[List[int]]:
    # Your code here`,
      java: `class Solution {
    public List<List<Integer>> levelOrder(TreeNode root) {
        // Your code here
    }
}`,
      cpp: `class Solution {
public:
    vector<vector<int>> levelOrder(TreeNode* root) {
        // Your code here
    }
};`,
      c: `struct TreeNode* levelOrder(struct TreeNode* root) {
    // Your code here
}`,
      csharp: `public class Solution {
    public IList<IList<int>> LevelOrder(TreeNode root) {
        // Your code here
    }
}`,
      go: `func levelOrder(root *TreeNode) [][]int {
    // Your code here
}`,
      rust: `impl Solution {
    pub fn level_order(root: Option<Rc<RefCell<TreeNode>>>) -> Vec<Vec<i32>> {
        // Your code here
    }
}`,
      php: `class Solution {
    function levelOrder($root) {
        // Your code here
    }
}`
    }
  },

  // Weekly Challenges
  {
    id: 'weekly-1',
    title: 'Word Break',
    description: 'Dynamic programming challenge to break words',
    topic: 'Dynamic Programming',
    difficulty: 'Hard',
    type: 'weekly',
    problemStatement: `Given a string s and a dictionary of strings wordDict, return true if s can be segmented into a space-separated sequence of one or more dictionary words.`,
    examples: [
      {
        input: 's = "leetcode", wordDict = ["leet", "code"]',
        output: 'true',
        explanation: 'The string "leetcode" can be segmented as "leet code".'
      },
      {
        input: 's = "applepenapple", wordDict = ["apple", "pen"]',
        output: 'true',
        explanation: 'The string "applepenapple" can be segmented as "apple pen apple".'
      },
      {
        input: 's = "catsandog", wordDict = ["cats", "dog", "sand", "and", "cat"]',
        output: 'false',
        explanation: 'The string "catsandog" cannot be segmented into a space-separated sequence of dictionary words.'
      }
    ],
    constraints: [
      '1 <= s.length <= 300',
      'wordDict[i] consists of only lowercase English letters.',
      'All the strings of wordDict are unique.'
    ],
    starterCode: {
      javascript: `function wordBreak(s, wordDict) {\n    // Your code here\n}`,
      typescript: `function wordBreak(s: string, wordDict: string[]): boolean {\n    // Your code here\n}`,
      python: `def wordBreak(s: str, wordDict: List[str]) -> bool:\n    # Your code here`,
      java: `class Solution {
    public boolean wordBreak(String s, List<String> wordDict) {
        // Your code here
    }
}`,
      cpp: `class Solution {
public:
    bool wordBreak(string s, vector<string>& wordDict) {
        // Your code here
    }
};`,
      c: `bool wordBreak(char* s, char** wordDict, int wordDictSize) {
    // Your code here
}`,
      csharp: `public class Solution {
    public bool WordBreak(string s, IList<string> wordDict) {
        // Your code here
    }
}`,
      go: `func wordBreak(s string, wordDict []string) bool {
    // Your code here
}`,
      rust: `impl Solution {
    pub fn word_break(s: String, word_dict: Vec<String>) -> bool {
        // Your code here
    }
}`,
      php: `class Solution {
    function wordBreak($s, $wordDict) {
        // Your code here
    }
}`
    }
  },
  {
    id: 'weekly-2',
    title: 'LRU Cache',
    description: 'Implement Least Recently Used Cache',
    topic: 'Hash Tables',
    difficulty: 'Medium',
    type: 'weekly',
    problemStatement: `Design a data structure that follows the constraints of a Least Recently Used (LRU) cache.`,
    examples: [
      {
        input: 'operations = ["LRUCache", "put", "put", "get", "put", "get", "put", "get", "get", "get"], inputs = [[2], [1, 1], [2, 2], [1], [3, 3], [2], [4, 4], [1], [3], [4]]',
        output: '[null, null, null, 1, null, -1, null, -1, 3, 4]',
        explanation: 'The LRUCache object is instantiated with capacity 2. After inserting 1, 2, 3, 4, the cache is full. When inserting 5, the cache is full, so the oldest item 1 is removed. When inserting 3, 4, the cache is full, so the oldest item 2 is removed.'
      }
    ],
    constraints: [
      '1 <= capacity <= 3000',
      '0 <= key <= 2 * 104',
      '0 <= value <= 2 * 104',
      'At most 2 * 105 calls will be made to get and put.'
    ],
    starterCode: {
      javascript: `function LRUCache(capacity) {\n    // Your code here\n}`,
      typescript: `function LRUCache(capacity: number) {\n    // Your code here\n}`,
      python: `def __init__(self, capacity: int):\n    # Your code here`,
      java: `class LRUCache {
    public LRUCache(int capacity) {
        // Your code here
    }
}`,
      cpp: `class LRUCache {
public:
    LRUCache(int capacity) {
        // Your code here
    }
};`,
      c: `struct LRUCache* lRUCacheCreate(int capacity) {
    // Your code here
}`,
      csharp: `public class LRUCache {
    public LRUCache(int capacity) {
        // Your code here
    }
}`,
      go: `type LRUCache struct {
    // Your code here
}`,
      rust: `impl LRUCache {
    pub fn new(capacity: i32) -> Self {
        // Your code here
    }
}`,
      php: `class LRUCache {
    public function __construct($capacity) {
        // Your code here
    }
}`
    }
  },
  {
    id: 'weekly-3',
    title: 'Merge K Sorted Lists',
    description: 'Merge k sorted linked lists',
    topic: 'Heaps',
    difficulty: 'Hard',
    type: 'weekly',
    problemStatement: `You are given an array of k linked-lists lists, each linked-list is sorted in ascending order.`,
    examples: [
      {
        input: 'lists = [[1,4,5],[1,3,4],[2,6]]',
        output: '[1,1,2,3,4,4,5,6]',
        explanation: 'The merged linked list is [1,1,2,3,4,4,5,6].'
      }
    ],
    constraints: [
      'k == lists.length',
      '0 <= k <= 104',
      '0 <= lists[i].length <= 500',
      '-104 <= lists[i][j] <= 104',
      'lists[i] is sorted in ascending order.',
      'All lists[i].length are the same.'
    ],
    starterCode: {
      javascript: `function mergeKLists(lists) {\n    // Your code here\n}`,
      typescript: `function mergeKLists(lists: Array<ListNode | null>): ListNode | null {\n    // Your code here\n}`,
      python: `def mergeKLists(self, lists: List[Optional[ListNode]]) -> Optional[ListNode]:
    # Your code here`,
      java: `class Solution {
    public ListNode mergeKLists(ListNode[] lists) {
        // Your code here
    }
}`,
      cpp: `class Solution {
public:
    ListNode* mergeKLists(vector<ListNode*>& lists) {
        // Your code here
    }
};`,
      c: `struct ListNode* mergeKLists(struct ListNode** lists, int listsSize) {
    // Your code here
}`,
      csharp: `public class Solution {
    public ListNode MergeKLists(ListNode[] lists) {
        // Your code here
    }
}`,
      go: `func mergeKLists(lists []*ListNode) *ListNode {
    // Your code here
}`,
      rust: `impl Solution {
    pub fn merge_k_lists(lists: Vec<Option<Box<ListNode>>>) -> Option<Box<ListNode>> {
        // Your code here
    }
}`,
      php: `class Solution {
    function mergeKLists($lists) {
        // Your code here
    }
}`
    }
  },

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
    # Your code here`,
      java: `class Solution {
    public int[] twoSum(int[] nums, int target) {
        // Your code here
    }
}`,
      cpp: `class Solution {
public:
    vector<int> twoSum(vector<int>& nums, int target) {
        // Your code here
    }
};`,
      c: `int* twoSum(int* nums, int numsSize, int target) {
    // Your code here
}`,
      csharp: `public class Solution {
    public int[] TwoSum(int[] nums, int target) {
        // Your code here
    }
}`,
      go: `func twoSum(nums []int, target int) []int {
    // Your code here
}`,
      rust: `impl Solution {
    pub fn two_sum(nums: Vec<i32>, target: i32) -> Vec<i32> {
        // Your code here
    }
}`,
      php: `class Solution {
    function twoSum($nums, $target) {
        // Your code here
    }
}`
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
    # Your code here`,
      java: `class Solution {
    public ListNode reverseList(ListNode head) {
        // Your code here
    }
}`,
      cpp: `class Solution {
public:
    ListNode* reverseList(ListNode* head) {
        // Your code here
    }
};`,
      c: `struct ListNode* reverseList(struct ListNode* head) {
    // Your code here
}`,
      csharp: `public class Solution {
    public ListNode ReverseList(ListNode head) {
        // Your code here
    }
}`,
      go: `func reverseList(head *ListNode) *ListNode {
    // Your code here
}`,
      rust: `impl Solution {
    pub fn reverse_list(head: Option<Box<ListNode>>) -> Option<Box<ListNode>> {
        // Your code here
    }
}`,
      php: `class Solution {
    function reverseList($head) {
        // Your code here
    }
}`
    }
  },
  // Add more challenges for each data structure...

  // Easy Challenges
  {
    id: 'palindrome-number',
    title: 'Palindrome Number',
    description: 'Determine if a number reads the same backward as forward',
    topic: 'Math',
    difficulty: 'Easy',
    type: 'regular',
    problemStatement: `Given an integer x, return true if x is a palindrome, and false otherwise.`,
    examples: [
      {
        input: 'x = 121',
        output: 'true',
        explanation: '121 reads as 121 from left to right and from right to left.'
      }
    ],
    constraints: ['-231 <= x <= 231 - 1'],
    starterCode: {
      javascript: `function isPalindrome(x) {\n    // Your code here\n}`,
      typescript: `function isPalindrome(x: number): boolean {\n    // Your code here\n}`,
      python: `def isPalindrome(x: int) -> bool:\n    # Your code here`,
      java: `class Solution {
    public boolean isPalindrome(int x) {
        // Your code here
    }
}`,
      cpp: `class Solution {
public:
    bool isPalindrome(int x) {
        // Your code here
    }
};`,
      c: `bool isPalindrome(int x) {
    // Your code here
}`,
      csharp: `public class Solution {
    public bool IsPalindrome(int x) {
        // Your code here
    }
}`,
      go: `func isPalindrome(x int) bool {
    // Your code here
}`,
      rust: `impl Solution {
    pub fn is_palindrome(x: i32) -> bool {
        // Your code here
    }
}`,
      php: `class Solution {
    function isPalindrome($x) {
        // Your code here
    }
}`
    }
  },
  {
    id: 'merge-sorted-array',
    title: 'Merge Sorted Array',
    description: 'Merge two sorted arrays into one',
    topic: 'Arrays',
    difficulty: 'Easy',
    type: 'regular',
    problemStatement: `You are given two integer arrays nums1 and nums2, sorted in non-decreasing order, and two integers m and n, representing the number of elements in nums1 and nums2 respectively.`,
    examples: [
      {
        input: 'nums1 = [1,2,3,0,0,0], m = 3, nums2 = [2,5,6], n = 3',
        output: '[1,2,2,3,5,6]',
        explanation: 'The arrays we are merging are [1,2,3] and [2,5,6].'
      }
    ],
    constraints: ['nums1.length == m + n', 'nums2.length == n'],
    starterCode: {
      javascript: `function merge(nums1, m, nums2, n) {\n    // Your code here\n}`,
      typescript: `function merge(nums1: number[], m: number, nums2: number[], n: number): void {\n    // Your code here\n}`,
      python: `def merge(nums1: List[int], m: int, nums2: List[int], n: int) -> None:\n    # Your code here`,
      java: `class Solution {
    public void merge(int[] nums1, int m, int[] nums2, int n) {
        // Your code here
    }
}`,
      cpp: `class Solution {
public:
    void merge(vector<int>& nums1, int m, vector<int>& nums2, int n) {
        // Your code here
    }
};`,
      c: `void merge(int* nums1, int m, int* nums2, int n) {
    // Your code here
}`,
      csharp: `public class Solution {
    public void Merge(int[] nums1, int m, int[] nums2, int n) {
        // Your code here
    }
}`,
      go: `func merge(nums1 []int, m int, nums2 []int, n int) {
    // Your code here
}`,
      rust: `impl Solution {
    pub fn merge(nums1: &mut Vec<i32>, m: i32, nums2: &Vec<i32>, n: i32) {
        // Your code here
    }
}`,
      php: `class Solution {
    function merge(&$nums1, $m, &$nums2, $n) {
        // Your code here
    }
}`
    }
  },

  // Medium Challenges
  {
    id: 'longest-palindrome',
    title: 'Longest Palindromic Substring',
    description: 'Find the longest palindromic substring in a string',
    topic: 'Strings',
    difficulty: 'Medium',
    type: 'regular',
    problemStatement: `Given a string s, return the longest palindromic substring in s.`,
    examples: [
      {
        input: 's = "babad"',
        output: '"bab"',
        explanation: '"aba" is also a valid answer.'
      }
    ],
    constraints: ['1 <= s.length <= 1000', 's consist of only digits and English letters.'],
    starterCode: {
      javascript: `function longestPalindrome(s) {\n    // Your code here\n}`,
      typescript: `function longestPalindrome(s: string): string {\n    // Your code here\n}`,
      python: `def longestPalindrome(s: str) -> str:\n    # Your code here`,
      java: `class Solution {
    public String longestPalindrome(String s) {
        // Your code here
    }
}`,
      cpp: `class Solution {
public:
    string longestPalindrome(string s) {
        // Your code here
    }
};`,
      c: `char* longestPalindrome(char* s) {
    // Your code here
}`,
      csharp: `public class Solution {
    public string LongestPalindrome(string s) {
        // Your code here
    }
}`,
      go: `func longestPalindrome(s string) string {
    // Your code here
}`,
      rust: `impl Solution {
    pub fn longest_palindrome(s: String) -> String {
        // Your code here
    }
}`,
      php: `class Solution {
    function longestPalindrome($s) {
        // Your code here
    }
}`
    }
  },
  {
    id: 'binary-tree-zigzag',
    title: 'Binary Tree Zigzag Level Order',
    description: 'Traverse binary tree in zigzag order',
    topic: 'Trees',
    difficulty: 'Medium',
    type: 'regular',
    problemStatement: `Given the root of a binary tree, return the zigzag level order traversal of its nodes' values.`,
    examples: [
      {
        input: 'root = [3,9,20,null,null,15,7]',
        output: '[[3],[20,9],[15,7]]',
        explanation: 'Traversing in zigzag order means alternating between left-to-right and right-to-left.'
      }
    ],
    constraints: ['The number of nodes in the tree is in the range [0, 2000]'],
    starterCode: {
      javascript: `function zigzagLevelOrder(root) {\n    // Your code here\n}`,
      typescript: `function zigzagLevelOrder(root: TreeNode | null): number[][] {\n    // Your code here\n}`,
      python: `def zigzagLevelOrder(root: Optional[TreeNode]) -> List[List[int]]:\n    # Your code here`,
      java: `class Solution {
    public List<List<Integer>> zigzagLevelOrder(TreeNode root) {
        // Your code here
    }
}`,
      cpp: `class Solution {
public:
    vector<vector<int>> zigzagLevelOrder(TreeNode* root) {
        // Your code here
    }
};`,
      c: `struct TreeNode* zigzagLevelOrder(struct TreeNode* root) {
    // Your code here
}`,
      csharp: `public class Solution {
    public IList<IList<int>> ZigzagLevelOrder(TreeNode root) {
        // Your code here
    }
}`,
      go: `func zigzagLevelOrder(root *TreeNode) [][]int {
    // Your code here
}`,
      rust: `impl Solution {
    pub fn zigzag_level_order(root: Option<Rc<RefCell<TreeNode>>>) -> Vec<Vec<i32>> {
        // Your code here
    }
}`,
      php: `class Solution {
    function zigzagLevelOrder($root) {
        // Your code here
    }
}`
    }
  },

  // Hard Challenges
  {
    id: 'median-sorted-arrays',
    title: 'Median of Two Sorted Arrays',
    description: 'Find median of two sorted arrays',
    topic: 'Arrays',
    difficulty: 'Hard',
    type: 'regular',
    problemStatement: `Given two sorted arrays nums1 and nums2 of size m and n respectively, return the median of the two sorted arrays.`,
    examples: [
      {
        input: 'nums1 = [1,3], nums2 = [2]',
        output: '2.00000',
        explanation: 'Merged array = [1,2,3] and median is 2.'
      }
    ],
    constraints: ['nums1.length + nums2.length >= 1'],
    starterCode: {
      javascript: `function findMedianSortedArrays(nums1, nums2) {\n    // Your code here\n}`,
      typescript: `function findMedianSortedArrays(nums1: number[], nums2: number[]): number {\n    // Your code here\n}`,
      python: `def findMedianSortedArrays(nums1: List[int], nums2: List[int]) -> float:\n    # Your code here`,
      java: `class Solution {
    public double findMedianSortedArrays(int[] nums1, int[] nums2) {
        // Your code here
    }
}`,
      cpp: `class Solution {
public:
    double findMedianSortedArrays(vector<int>& nums1, vector<int>& nums2) {
        // Your code here
    }
};`,
      c: `double findMedianSortedArrays(int* nums1, int nums1Size, int* nums2, int nums2Size) {
    // Your code here
}`,
      csharp: `public class Solution {
    public double FindMedianSortedArrays(int[] nums1, int[] nums2) {
        // Your code here
    }
}`,
      go: `func findMedianSortedArrays(nums1 []int, nums2 []int) float64 {
    // Your code here
}`,
      rust: `impl Solution {
    pub fn find_median_sorted_arrays(nums1: Vec<i32>, nums2: Vec<i32>) -> f64 {
        // Your code here
    }
}`,
      php: `class Solution {
    function findMedianSortedArrays($nums1, $nums2) {
        // Your code here
    }
}`
    }
  },
  {
    id: 'regular-expression',
    title: 'Regular Expression Matching',
    description: 'Implement regular expression matching',
    topic: 'Dynamic Programming',
    difficulty: 'Hard',
    type: 'regular',
    problemStatement: `Given an input string s and a pattern p, implement regular expression matching with support for '.' and '*' where '.' matches any single character and '*' matches zero or more of the preceding element.`,
    examples: [
      {
        input: 's = "aa", p = "a*"',
        output: 'true',
        explanation: '"a*" means zero or more of "a", thus it matches "aa".'
      }
    ],
    constraints: ['1 <= s.length <= 20', '1 <= p.length <= 30'],
    starterCode: {
      javascript: `function isMatch(s, p) {\n    // Your code here\n}`,
      typescript: `function isMatch(s: string, p: string): boolean {\n    // Your code here\n}`,
      python: `def isMatch(s: str, p: str) -> bool:\n    # Your code here`,
      java: `class Solution {
    public boolean isMatch(String s, String p) {
        // Your code here
    }
}`,
      cpp: `class Solution {
public:
    bool isMatch(string s, string p) {
        // Your code here
    }
};`,
      c: `bool isMatch(char* s, char* p) {
    // Your code here
}`,
      csharp: `public class Solution {
    public bool IsMatch(string s, string p) {
        // Your code here
    }
}`,
      go: `func isMatch(s string, p string) bool {
    // Your code here
}`,
      rust: `impl Solution {
    pub fn is_match(s: String, p: String) -> bool {
        // Your code here
    }
}`,
      php: `class Solution {
    function isMatch($s, $p) {
        // Your code here
    }
}`
    }
  }
];