This guide covers the core concepts needed to work with Claude and AI-powered systems.

## 1. What is Claude

### 1.1 LLM (Large Language Model)

| Question | Answer |
|----------|--------|
| **What** | AI trained on massive text data that generates human-like responses by predicting the next word |
| **Why** | Enables natural language understanding, code generation, reasoning, and creative tasks |
| **When** | Use when you need text generation, analysis, coding assistance, or conversation |

**Learn more:** [Mapping the Mind of a Language Model](https://www.anthropic.com/research/mapping-mind-language-model)

---

### 1.2 Claude

| Question | Answer |
|----------|--------|
| **What** | Anthropic's LLM assistant (current family: Claude 4.5) |
| **Why** | Designed for helpfulness, harmlessness, and honesty |
| **When** | Use for coding, analysis, writing, reasoning tasks |

**Models:**
| Model | Best For |
|-------|----------|
| Opus 4.5 | Complex reasoning, coding, analysis |
| Sonnet 4.5 | Balanced speed/quality, daily tasks |
| Haiku 4.5 | Fast, simple tasks, high volume |

**Learn more:** [Models Overview](https://platform.claude.com/docs/en/about-claude/models/overview)

---

## 2. How to Talk to Claude

Before learning prompt techniques, you need to know WHERE to interact with Claude.

### 2.1 Three Ways to Use Claude

| Method | Best For | Skill Level |
|--------|----------|-------------|
| [claude.ai](https://claude.ai) | Quick conversations, exploration | Beginner |
| [API](https://platform.claude.com/docs/en/api/overview) | Building apps, automation | Intermediate |
| [Claude Code](https://code.claude.com/docs/en/overview) | Coding in terminal | Intermediate |

---

### 2.2 API (Application Programming Interface)

| Question | Answer |
|----------|--------|
| **What** | Code interface to send messages to Claude and receive responses |
| **Why** | Build apps, automate tasks, integrate Claude into systems |
| **When** | Building products, automation, custom integrations |
| **Where** | HTTP requests to `api.anthropic.com` |

**Basic Flow:**
```
Your Code → HTTP Request → Anthropic API → Claude → Response → Your Code
```

**Learn more:** [API Overview](https://platform.claude.com/docs/en/api/overview)

---

## 3. Core Concepts

Now that you know WHERE to use Claude, learn the concepts that affect HOW it responds.

### 3.1 Tokens

| Question | Answer |
|----------|--------|
| **What** | Units of text LLMs process (~4 characters or ~0.75 words per token) |
| **Why** | Determines cost (pay per token) and context limits (max tokens per conversation) |
| **When** | Consider when managing costs or hitting context limits |

**Examples:**
```
"Hello" = 1 token
"Hello, world!" = 4 tokens
1 page of text ≈ 500 tokens
```

**Learn more:** [Token Counting](https://platform.claude.com/docs/en/build-with-claude/token-counting)

---

### 3.2 Context Window

| Question | Answer |
|----------|--------|
| **What** | Maximum tokens an LLM can "see" at once (Claude: up to 200K tokens, 1M in beta) |
| **Why** | Limits how much information Claude can consider in one conversation |
| **When** | Matters when working with long documents or extended conversations |
| **Where** | Applies to entire conversation: system prompt + messages + response |

**Analogy:** Context window is Claude's "working memory" - everything must fit in this space.

**Learn more:** [Context Windows](https://platform.claude.com/docs/en/build-with-claude/context-windows)

---

### 3.3 Temperature

| Question | Answer |
|----------|--------|
| **What** | Controls randomness in responses (0 = deterministic, 1 = creative) |
| **Why** | Balances consistency vs. creativity based on task needs |
| **When** | Lower for factual tasks (code, math), higher for creative tasks (writing, brainstorming) |
| **Where** | Set as API parameter when making requests (see [API Reference](https://platform.claude.com/docs/en/api/getting-started)) |

**Settings:**
| Temperature | Use Case |
|-------------|----------|
| 0.0 | Code generation, math, factual Q&A |
| 0.3-0.5 | General tasks, balanced responses |
| 0.7-1.0 | Creative writing, brainstorming |

---

### 3.4 System Prompt

| Question | Answer |
|----------|--------|
| **What** | Instructions that define Claude's behavior for a conversation |
| **Why** | Sets persona, rules, format, and constraints for all responses |
| **When** | Set once at conversation start, applies to all messages |
| **Where** | First message in API request, or `CLAUDE.md` file in Claude Code |

**Example:**
```
You are a senior TypeScript developer.
Always use strict typing.
Never use `any` type.
Explain your code changes briefly.
```

**Learn more:** [System Prompts](https://platform.claude.com/docs/en/build-with-claude/prompt-engineering/system-prompts)

---

## 4. Prompt Engineering

Now you know the concepts. Here's how to write effective prompts.

### Reading List

| # | Topic | Link |
|---|-------|------|
| 1 | Prompt Engineering Overview | [Overview](https://platform.claude.com/docs/en/build-with-claude/prompt-engineering/overview) |
| 2 | Claude 4 Best Practices | [Best Practices](https://platform.claude.com/docs/en/build-with-claude/prompt-engineering/claude-4-best-practices) |
| 3 | Interactive Tutorial | [GitHub Tutorial](https://github.com/anthropics/prompt-eng-interactive-tutorial) |

---

### 4.1 Be Explicit

| Question | Answer |
|----------|--------|
| **What** | State exactly what you need - leave nothing to interpretation |
| **Why** | Claude guesses when instructions are vague = inconsistent results |
| **When** | Always - especially for specific outputs |

| Vague (Bad) | Explicit (Good) |
|-------------|-----------------|
| "Write a function" | "Write a TypeScript function that validates emails using regex, returns boolean" |
| "Make it better" | "Reduce complexity, extract duplicated logic, add null handling" |

---

### 4.2 Give Examples (Multishot Prompting)

| Question | Answer |
|----------|--------|
| **What** | Show 2-3 examples of input → output patterns |
| **Why** | Claude pattern-matches better than interpreting descriptions |
| **When** | Formatting, classification, data transformation |

**Example:**
```
Convert to slug format:
- "Hello World" → "hello-world"
- "My First Post!" → "my-first-post"

Now convert: "Claude AI Tutorial"
```

---

### 4.3 Structure with XML Tags

| Question | Answer |
|----------|--------|
| **What** | Use XML tags to create clear boundaries in prompts |
| **Why** | Long prompts become confusing - tags organize sections |
| **When** | Complex prompts with multiple parts (context, task, examples) |

**Common Tags:**
```xml
<context>Background info + WHY this matters</context>
<task>What you want Claude to do</task>
<examples>Input → Output patterns</examples>
<constraints>Rules and limitations</constraints>
<output_format>How to structure the response</output_format>
```

**Learn more:** [Use XML Tags](https://platform.claude.com/docs/en/build-with-claude/prompt-engineering/use-xml-tags)

---

### 4.4 Explain Why

| Question | Answer |
|----------|--------|
| **What** | Tell Claude *why* a rule matters, not just the rule |
| **Why** | Claude generalizes from reasons - applies to edge cases |
| **When** | Any constraint or rule in your prompt |

| Rule Only (Weak) | Rule + Why (Strong) |
|------------------|---------------------|
| "Never use ellipses" | "Never use ellipses because TTS can't pronounce them" |
| "Keep responses short" | "Keep responses short - users read on mobile" |

---

### 4.5 Don't Say "Think"

| Question | Answer |
|----------|--------|
| **What** | The word "think" triggers extended thinking mode (slower, more tokens) |
| **Why** | Avoid unintended slow responses and higher costs |
| **When** | Everyday prompts where deep reasoning isn't needed |

| Avoid | Use Instead |
|-------|-------------|
| "Think about..." | "Consider..." |
| "What do you think?" | "What's your assessment?" |

**When TO use "think":** Complex multi-step problems where you *want* deep reasoning.

---

### 4.6 Action Words vs. Discussion Words

| Question | Answer |
|----------|--------|
| **What** | Claude takes words literally - "suggest" = talk, "change" = edit |
| **Why** | Gets Claude to act instead of just discuss |
| **When** | You want Claude to make changes, not just recommend |

| Discussion (Claude talks) | Action (Claude does) |
|---------------------------|----------------------|
| "Can you suggest improvements?" | "Improve this function" |
| "How would you fix this?" | "Fix this bug" |

---

### 4.7 Keep It Minimal

| Question | Answer |
|----------|--------|
| **What** | Explicitly tell Claude to avoid over-engineering |
| **Why** | Claude 4.5 loves to add extra files, abstractions, "future-proofing" |
| **When** | Coding tasks, implementation requests |

**Add this to prompts:**
```
Keep the solution minimal. Only change what's necessary.
Don't add abstractions or improvements beyond the request.
Three similar lines of code is better than a premature abstraction.
```

---

### The Prompt Formula

```
YOUR PROMPT =
1. <context> Background info + WHY this matters
2. <task> EXPLICIT instruction with ACTION verbs
3. <examples> Input → Output (2-3 examples)
4. <constraints> Keep minimal. No over-engineering.
```

---

## 5. Tools & Agents

Claude can do more than generate text. With tools, it can interact with the real world.

### Reading List

| # | Topic | Link |
|---|-------|------|
| 1 | Tool Use Overview | [Tool Use](https://platform.claude.com/docs/en/agents-and-tools/tool-use/overview) |
| 2 | Building Effective Agents | [Building Agents](https://www.anthropic.com/engineering/building-effective-agents) |
| 3 | Agent SDK Overview | [Agent SDK](https://platform.claude.com/docs/en/agent-sdk/overview) |

---

### 5.1 Tool Use

| Question | Answer |
|----------|--------|
| **What** | Functions Claude can request to execute (weather, database, APIs) |
| **Why** | Claude can only generate text - tools let it interact with the real world |
| **When** | Need Claude to fetch data, perform actions, access external systems |
| **Where** | Defined in API requests, executed on your system |

**The Flow:**
```
1. You → Claude: "What's the weather?" + tool definitions
2. Claude → You: "Call get_weather({location: 'Paris'})"
3. You → Claude: Execute tool, return "22°C, sunny"
4. Claude → You: "The weather in Paris is 22°C and sunny."
```

**Tool Definition:**
```json
{
  "name": "get_weather",
  "description": "Get current weather. Use when user asks about weather.",
  "input_schema": {
    "type": "object",
    "properties": {
      "location": {"type": "string", "description": "City name"}
    },
    "required": ["location"]
  }
}
```

**Key Rule:** Descriptions matter most - write 3-4 detailed sentences.

---

### 5.2 Agents

| Question | Answer |
|----------|--------|
| **What** | AI that uses tools autonomously in loops to complete complex tasks |
| **Why** | Handle multi-step tasks without human intervention at each step |
| **When** | Complex tasks requiring multiple actions (coding, research, data processing) |
| **Where** | Built on top of Claude API with tool use |

**Agent = Claude + Tools + Loop**

```
User Request
    ↓
Claude decides action
    ↓
Calls tool → Gets result
    ↓
Claude decides next action
    ↓
Calls another tool → Gets result
    ↓
... (repeats until done)
    ↓
Final response
```

---

### 5.3 Agentic Loop

| Question | Answer |
|----------|--------|
| **What** | Pattern: Claude calls tool → gets result → decides next action → repeats |
| **Why** | Enables autonomous multi-step problem solving |
| **When** | Tasks requiring exploration, iteration, or multiple actions |
| **Where** | Core pattern in Claude Code and custom agents |

**Example: Code Fix Agent**
```
1. Read file → sees error
2. Search codebase → finds related code
3. Edit file → makes fix
4. Run tests → sees failure
5. Edit file → adjusts fix
6. Run tests → passes
7. Done!
```

---

## 6. MCP & Claude Code

Advanced tools for power users and teams.

### Reading List

| # | Topic | Link |
|---|-------|------|
| 1 | MCP Overview | [Model Context Protocol](https://modelcontextprotocol.io) |
| 2 | MCP Servers | [MCP Servers](https://modelcontextprotocol.io/docs/concepts/servers) |
| 3 | MCP Course (Free) | [MCP Course](https://anthropic.skilljar.com/introduction-to-model-context-protocol) |
| 4 | Claude Code Overview | [Claude Code Docs](https://code.claude.com/docs/en/overview) |
| 5 | Claude Code GitHub | [GitHub Repo](https://github.com/anthropics/claude-code) |
| 6 | Slash Commands | [Slash Commands](https://code.claude.com/docs/en/slash-commands) |

---

### 6.1 MCP (Model Context Protocol)

| Question | Answer |
|----------|--------|
| **What** | Standard protocol for connecting Claude to external tools and data |
| **Why** | One standard way to integrate any service (vs. custom integrations) |
| **When** | Connecting Claude to Slack, Jira, databases, APIs |
| **Where** | Between Claude Code and external services |

**Analogy:** MCP is like USB-C for AI - one standard connector for everything.

```
Claude Code ←→ MCP Protocol ←→ MCP Server ←→ External Service
                                              (Slack, Jira, DB)
```

---

### 6.2 MCP Server

| Question | Answer |
|----------|--------|
| **What** | Service that exposes tools to Claude via MCP protocol |
| **Why** | Packages integration logic in reusable, standard format |
| **When** | Need Claude to interact with a specific service |
| **Where** | Runs locally or remotely, connects to Claude Code |

**Examples:**
```
slack-mcp-server  → Post messages, read channels
jira-mcp-server   → Create issues, query tickets
github-mcp-server → Create PRs, read code
```

---

### 6.3 Claude Code

| Question | Answer |
|----------|--------|
| **What** | Anthropic's CLI tool for coding with Claude in your terminal |
| **Why** | AI coding assistant that understands your entire codebase |
| **When** | Daily development - coding, debugging, git, documentation |
| **Where** | Runs in terminal, works in any project directory |

**Key Features:**
| Feature | What it does |
|---------|--------------|
| Codebase understanding | Reads and searches your entire project |
| Multi-file editing | Makes changes across multiple files |
| Git integration | Commits, PRs, branch management |
| MCP integration | Connects to external tools |

---

### 6.4 CLAUDE.md

| Question | Answer |
|----------|--------|
| **What** | Project instructions file Claude reads automatically |
| **Why** | Gives Claude context about your project without repeating yourself |
| **When** | Set up once per project, Claude reads it every session |
| **Where** | Root of your project directory |

**Contains:**
- Project architecture overview
- Coding standards and conventions
- Build commands
- Important patterns to follow

---

### 6.5 Slash Commands

| Question | Answer |
|----------|--------|
| **What** | Custom shortcuts for complex prompts (e.g., `/commit`, `/plan`) |
| **Why** | Reusable workflows without retyping long prompts |
| **When** | Repetitive tasks with consistent patterns |
| **Where** | Defined in `.claude/commands/` folder |

**Examples:**
```bash
/commit          # Smart commit with good message
/review-pr 123   # Review pull request #123
/plan            # Create implementation plan
```

---

## Quick Glossary

| Term | One-liner |
|------|-----------|
| **LLM** | AI that predicts next words based on training data |
| **Token** | ~4 characters or ~0.75 words |
| **Context Window** | LLM's "memory" for current conversation |
| **Temperature** | Creativity dial (0=focused, 1=random) |
| **System Prompt** | Instructions defining Claude's behavior |
| **API** | Code interface to talk to Claude |
| **Tool** | Function Claude can request to execute |
| **Agent** | Claude + tools + loop = autonomous task completion |
| **Agentic Loop** | Tool call → result → next decision → repeat |
| **MCP** | USB-C for AI - standard protocol to connect tools |
| **MCP Server** | Service exposing tools via MCP protocol |
| **Claude Code** | Terminal-based AI coding assistant |
| **CLAUDE.md** | Project instructions file for Claude |
| **Slash Command** | Shortcut for complex prompts |
