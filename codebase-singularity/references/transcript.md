# Transcript (YouTube captions)

- Source: `en-orig` captions downloaded via `yt-dlp`
- Video: https://youtu.be/fop_yxV-mPo?si=ufh6xRFv874mU6Ud
- Local captions: `/Users/vishal/clawd/videos/*_fop_yxV-mPo.en-orig.vtt` (raw), `/Users/vishal/clawd/videos/*_fop_yxV-mPo.en.vtt`

> Note: This is a caption-derived transcript (not Whisper). If we later rerun Whisper successfully, we can replace this file.


## Captions

00:00:00.160 --> 00:00:03.429 align:start position:0%
There is one mental framework that sits

00:00:03.439 --> 00:00:06.470 align:start position:0%
at the center. An idea so important that

00:00:06.480 --> 00:00:08.950 align:start position:0%
if you capture it, it can change the way

00:00:08.960 --> 00:00:12.070 align:start position:0%
you engineer forever. The agentic layer.

00:00:12.080 --> 00:00:15.110 align:start position:0%
This is the new ring around your

00:00:15.120 --> 00:00:17.590 align:start position:0%
codebase where you teach your agents to

00:00:17.600 --> 00:00:20.470 align:start position:0%
operate your application on your behalf

00:00:20.480 --> 00:00:23.509 align:start position:0%
as well and even better than you and

00:00:23.519 --> 00:00:25.830 align:start position:0%
your team ever could. Focusing on

00:00:25.840 --> 00:00:27.670 align:start position:0%
building the agentic layer of your

00:00:27.680 --> 00:00:30.790 align:start position:0%
codebase is the highest return on

00:00:30.800 --> 00:00:33.750 align:start position:0%
investment action for any engineer in

00:00:33.760 --> 00:00:36.389 align:start position:0%
the age of agents we live in. Why is

00:00:36.399 --> 00:00:38.950 align:start position:0%
that? As you know, when you scale your

00:00:38.960 --> 00:00:42.069 align:start position:0%
compute, you scale your impact. We're

00:00:42.079 --> 00:00:44.709 align:start position:0%
not just AI coding anymore. Our agents

00:00:44.719 --> 00:00:47.670 align:start position:0%
can take actions on our behalf. And this

00:00:47.680 --> 00:00:50.630 align:start position:0%
has changed engineering forever. Once

00:00:50.640 --> 00:00:52.790 align:start position:0%
you've built a sufficiently powerful

00:00:52.800 --> 00:00:55.670 align:start position:0%
agentic layer, something will happen.

00:00:55.680 --> 00:00:58.069 align:start position:0%
The codebase singularity. In this

00:00:58.079 --> 00:01:00.869 align:start position:0%
moment, you, the engineer, will realize

00:01:00.879 --> 00:01:04.469 align:start position:0%
one simple fact. My agents can now run

00:01:04.479 --> 00:01:07.429 align:start position:0%
my codebase better than I can. I trust

00:01:07.439 --> 00:01:10.070 align:start position:0%
them to ship more than I trust myself or

00:01:10.080 --> 00:01:12.789 align:start position:0%
my team. Nothing ships to production

00:01:12.799 --> 00:01:16.390 align:start position:0%
without my teams of agents. Yes, this

00:01:16.400 --> 00:01:18.230 align:start position:0%
might sound crazy. It might sound far

00:01:18.240 --> 00:01:20.550 align:start position:0%
out, but if you've been pushing what you

00:01:20.560 --> 00:01:22.149 align:start position:0%
can do with agents, if you've been

00:01:22.159 --> 00:01:24.789 align:start position:0%
putting these tactics to work already,

00:01:24.799 --> 00:01:27.350 align:start position:0%
maybe you already see this future on the

00:01:27.360 --> 00:01:29.990 align:start position:0%
horizon, the agentic horizon. I can tell

00:01:30.000 --> 00:01:32.310 align:start position:0%
you this for certain right now. There is

00:01:32.320 --> 00:01:35.670 align:start position:0%
an agentic layer that could exist inside

00:01:35.680 --> 00:01:39.109 align:start position:0%
your codebase so powerful that your

00:01:39.119 --> 00:01:42.710 align:start position:0%
codebase runs itself. The only question

00:01:42.720 --> 00:01:46.310 align:start position:0%
now is, do you know how to build it? As

00:01:46.320 --> 00:01:49.510 align:start position:0%
we work through building agentic layers,

00:01:49.520 --> 00:01:51.990 align:start position:0%
keep this idea in your mind and think

00:01:52.000 --> 00:01:54.149 align:start position:0%
through what it would take for you to

00:01:54.159 --> 00:01:57.190 align:start position:0%
trust your agents to run your codebase

00:01:57.200 --> 00:01:59.990 align:start position:0%
better than you could from prompt to

00:02:00.000 --> 00:02:01.910 align:start position:0%
production. In this lesson, we're going

00:02:01.920 --> 00:02:04.149 align:start position:0%
to put together the missing pieces and

00:02:04.159 --> 00:02:06.870 align:start position:0%
see how we can attain the codebase

00:02:06.880 --> 00:02:11.430 align:start position:0%
singularity.

00:02:11.440 --> 00:02:15.030 align:start position:0%
There are three concrete classes of the

00:02:15.040 --> 00:02:18.309 align:start position:0%
agentic layer. Class one, class 2, and

00:02:18.319 --> 00:02:21.589 align:start position:0%
class three. Each defined by a unique

00:02:21.599 --> 00:02:23.350 align:start position:0%
element that makes them distinct from

00:02:23.360 --> 00:02:26.070 align:start position:0%
the rest. Our whole goal here is to look

00:02:26.080 --> 00:02:28.710 align:start position:0%
at the components, the raw elements that

00:02:28.720 --> 00:02:30.790 align:start position:0%
make up the new ring around your

00:02:30.800 --> 00:02:33.190 align:start position:0%
codebase where you have agents drive

00:02:33.200 --> 00:02:35.589 align:start position:0%
your engineering experience and you

00:02:35.599 --> 00:02:38.070 align:start position:0%
drive your agents. the green squares

00:02:38.080 --> 00:02:40.550 align:start position:0%
here, the outer layer, this is the new

00:02:40.560 --> 00:02:43.270 align:start position:0%
aentic layer. The inner layer here,

00:02:43.280 --> 00:02:46.070 align:start position:0%
right, these dark squares, this is going

00:02:46.080 --> 00:02:48.550 align:start position:0%
to be your application layer. And we're

00:02:48.560 --> 00:02:50.550 align:start position:0%
bundling a ton of things underneath your

00:02:50.560 --> 00:02:51.830 align:start position:0%
application layer. We're talking about

00:02:51.840 --> 00:02:53.589 align:start position:0%
your database, your front end, your

00:02:53.599 --> 00:02:55.589 align:start position:0%
backend, your scripts, all the

00:02:55.599 --> 00:02:57.430 align:start position:0%
application stuff, even your DevOps

00:02:57.440 --> 00:02:59.270 align:start position:0%
stuff, right? This all goes underneath

00:02:59.280 --> 00:03:01.350 align:start position:0%
the application layer. Why is that? It's

00:03:01.360 --> 00:03:03.589 align:start position:0%
because we want to be able to bundle

00:03:03.599 --> 00:03:06.149 align:start position:0%
your different repositories underneath

00:03:06.159 --> 00:03:08.390 align:start position:0%
your agentic layer so that we can do

00:03:08.400 --> 00:03:11.110 align:start position:0%
something like this. Code bases often

00:03:11.120 --> 00:03:14.309 align:start position:0%
contain more than one application. So by

00:03:14.319 --> 00:03:16.790 align:start position:0%
bundling your agentic layer around your

00:03:16.800 --> 00:03:18.869 align:start position:0%
applications, your agents can

00:03:18.879 --> 00:03:21.509 align:start position:0%
effectively see everything. Every class

00:03:21.519 --> 00:03:24.309 align:start position:0%
is going to have one to n grades that

00:03:24.319 --> 00:03:26.229 align:start position:0%
will give you a rough understanding of

00:03:26.239 --> 00:03:28.630 align:start position:0%
how powerful your agentic layer is.

00:03:28.640 --> 00:03:29.990 align:start position:0%
You're going to be able to quickly

00:03:30.000 --> 00:03:31.830 align:start position:0%
identify where you are as we move

00:03:31.840 --> 00:03:34.229 align:start position:0%
through classes and grades so that you

00:03:34.239 --> 00:03:36.229 align:start position:0%
can make improvements and get to that

00:03:36.239 --> 00:03:37.990 align:start position:0%
next level. And then once you reach the

00:03:38.000 --> 00:03:40.149 align:start position:0%
limit of a certain class, look to make

00:03:40.159 --> 00:03:43.430 align:start position:0%
that next jump uniquely identified by a

00:03:43.440 --> 00:03:45.509 align:start position:0%
new dimension that we'll talk about as

00:03:45.519 --> 00:03:47.589 align:start position:0%
we progress from grade to grade from

00:03:47.599 --> 00:03:49.750 align:start position:0%
class to class all the way up to class

00:03:49.760 --> 00:03:53.030 align:start position:0%
three and the final grade. Now, let's

00:03:53.040 --> 00:03:55.350 align:start position:0%
start by looking at a powerful version

00:03:55.360 --> 00:03:58.710 align:start position:0%
of a class 3 agentic system with an

00:03:58.720 --> 00:04:00.949 align:start position:0%
orchestrator guiding the workflow.

00:04:00.959 --> 00:04:02.949 align:start position:0%
You've seen powerful systems like this

00:04:02.959 --> 00:04:05.350 align:start position:0%
in our previous two agentic horizon

00:04:05.360 --> 00:04:07.030 align:start position:0%
lessons. What we're going to do now is

00:04:07.040 --> 00:04:10.390 align:start position:0%
run two brand new workflows and combine

00:04:10.400 --> 00:04:12.149 align:start position:0%
some really big ideas. I'm going to open

00:04:12.159 --> 00:04:14.390 align:start position:0%
up the prompt interface here as usual.

00:04:14.400 --> 00:04:16.629 align:start position:0%
And you'll notice we have one new

00:04:16.639 --> 00:04:19.030 align:start position:0%
section. Our orchestrator agent can now

00:04:19.040 --> 00:04:22.230 align:start position:0%
kick off AI developer workflows. I'll

00:04:22.240 --> 00:04:23.749 align:start position:0%
paste in this prompt here. And I'm

00:04:23.759 --> 00:04:25.350 align:start position:0%
commanding the orchestrator agent to

00:04:25.360 --> 00:04:27.590 align:start position:0%
kick off this specific workflow in this

00:04:27.600 --> 00:04:30.629 align:start position:0%
specific directory with just a single

00:04:30.639 --> 00:04:32.230 align:start position:0%
simple prompt. We're not over

00:04:32.240 --> 00:04:33.590 align:start position:0%
complicating this. I just want to show

00:04:33.600 --> 00:04:35.830 align:start position:0%
you so that you have a concrete vision

00:04:35.840 --> 00:04:38.150 align:start position:0%
of the types of systems you can build

00:04:38.160 --> 00:04:39.510 align:start position:0%
out. So we're going to fire this off

00:04:39.520 --> 00:04:41.270 align:start position:0%
here. Let's go ahead and run another

00:04:41.280 --> 00:04:44.230 align:start position:0%
build out a markdown preview application

00:04:44.240 --> 00:04:47.110 align:start position:0%
here in one shot with our plan, build,

00:04:47.120 --> 00:04:49.590 align:start position:0%
review, and fix. And this is an AI

00:04:49.600 --> 00:04:51.350 align:start position:0%
developer workflow. So the orchestrator

00:04:51.360 --> 00:04:52.950 align:start position:0%
doesn't need to do anything, right? This

00:04:52.960 --> 00:04:55.110 align:start position:0%
runs end to end. We're going to run one

00:04:55.120 --> 00:04:56.550 align:start position:0%
more workflow here. And then I want to

00:04:56.560 --> 00:04:58.230 align:start position:0%
show you something awesome. You've seen

00:04:58.240 --> 00:05:00.950 align:start position:0%
the generic log view. We have pushed our

00:05:00.960 --> 00:05:03.350 align:start position:0%
orchestrator to be able to control AI

00:05:03.360 --> 00:05:06.230 align:start position:0%
developer workflows. We now have two

00:05:06.240 --> 00:05:08.230 align:start position:0%
workflows running. So plan, build,

00:05:08.240 --> 00:05:09.909 align:start position:0%
review, fix, and just a simple plan

00:05:09.919 --> 00:05:11.590 align:start position:0%
build. We have given our orchestrator

00:05:11.600 --> 00:05:14.230 align:start position:0%
agent the ability to run arbitrary

00:05:14.240 --> 00:05:17.350 align:start position:0%
endtoend workflows. Now let's dial in

00:05:17.360 --> 00:05:20.310 align:start position:0%
and start from zero, right? Let's reset

00:05:20.320 --> 00:05:21.909 align:start position:0%
because we don't start here. We don't

00:05:21.919 --> 00:05:23.590 align:start position:0%
start at class 3. We don't start with

00:05:23.600 --> 00:05:25.350 align:start position:0%
powerful orchestration systems. We start

00:05:25.360 --> 00:05:29.189 align:start position:0%
with nothing. So as mentioned, every

00:05:29.199 --> 00:05:31.270 align:start position:0%
single codebase should now have these

00:05:31.280 --> 00:05:33.830 align:start position:0%
two key components. The application

00:05:33.840 --> 00:05:35.990 align:start position:0%
layer and the agentic layer. These two

00:05:36.000 --> 00:05:38.310 align:start position:0%
squares here represent a brand new

00:05:38.320 --> 00:05:40.390 align:start position:0%
codebase. Now, oftent times you'll be

00:05:40.400 --> 00:05:42.550 align:start position:0%
operating in an existing codebase that

00:05:42.560 --> 00:05:43.909 align:start position:0%
will look like this, right? You'll

00:05:43.919 --> 00:05:46.310 align:start position:0%
already have some pieces, right?

00:05:46.320 --> 00:05:48.469 align:start position:0%
Modules, files of your application layer

00:05:48.479 --> 00:05:50.629 align:start position:0%
and then you'll start adding on your

00:05:50.639 --> 00:05:53.350 align:start position:0%
agentic layer around your codebase. Now,

00:05:53.360 --> 00:05:56.070 align:start position:0%
what does this really look like? Let's

00:05:56.080 --> 00:05:57.749 align:start position:0%
start from a green field brand new

00:05:57.759 --> 00:06:00.550 align:start position:0%
application just to make this all clear.

00:06:00.560 --> 00:06:03.350 align:start position:0%
What exactly is in our agentic layer?

00:06:03.360 --> 00:06:06.469 align:start position:0%
This is our class one grade one agentic

00:06:06.479 --> 00:06:09.110 align:start position:0%
layer. This the thinnest possible

00:06:09.120 --> 00:06:10.950 align:start position:0%
agentic layer. You can have a small

00:06:10.960 --> 00:06:12.950 align:start position:0%
amount of code and you have a prime

00:06:12.960 --> 00:06:15.830 align:start position:0%
prompt andor memory files. It doesn't

00:06:15.840 --> 00:06:18.309 align:start position:0%
get thinner than this. If you have this,

00:06:18.319 --> 00:06:20.629 align:start position:0%
you technically have an agentic layer.

00:06:20.639 --> 00:06:23.430 align:start position:0%
Now, let's dive into a concrete codebase

00:06:23.440 --> 00:06:24.950 align:start position:0%
structure to see what this looks like.

00:06:24.960 --> 00:06:26.469 align:start position:0%
This is an example project structure.

00:06:26.479 --> 00:06:27.670 align:start position:0%
We're going to work through several of

00:06:27.680 --> 00:06:29.749 align:start position:0%
these to make it absolutely clear what

00:06:29.759 --> 00:06:32.070 align:start position:0%
it looks like to have an agentic layer

00:06:32.080 --> 00:06:33.670 align:start position:0%
surrounding your application layer. All

00:06:33.680 --> 00:06:35.350 align:start position:0%
right, so we have application layer

00:06:35.360 --> 00:06:37.430 align:start position:0%
files, folders, directories, so on and

00:06:37.440 --> 00:06:39.510 align:start position:0%
so forth. And we have our agentic layer

00:06:39.520 --> 00:06:41.830 align:start position:0%
files. If we open up dogcloud here, do

00:06:41.840 --> 00:06:44.070 align:start position:0%
commands, we can see we have this prime

00:06:44.080 --> 00:06:45.909 align:start position:0%
command. As you know, the prime command

00:06:45.919 --> 00:06:48.710 align:start position:0%
effectively represents a memory file.

00:06:48.720 --> 00:06:50.230 align:start position:0%
But the big difference here is that you

00:06:50.240 --> 00:06:52.070 align:start position:0%
can activate this whenever you want to

00:06:52.080 --> 00:06:54.150 align:start position:0%
and you can fine-tune the prime command

00:06:54.160 --> 00:06:57.110 align:start position:0%
to run any specific workflow you want

00:06:57.120 --> 00:06:59.029 align:start position:0%
to. Okay, so this is just a prompt that

00:06:59.039 --> 00:07:01.430 align:start position:0%
effectively activates your agent to read

00:07:01.440 --> 00:07:03.110 align:start position:0%
specific files, right? So there's

00:07:03.120 --> 00:07:04.230 align:start position:0%
nothing new here, right? We have a

00:07:04.240 --> 00:07:06.790 align:start position:0%
classic agentic prompt doc of course is

00:07:06.800 --> 00:07:08.390 align:start position:0%
our memory file that's always going to

00:07:08.400 --> 00:07:09.909 align:start position:0%
load. You've seen this, you understand

00:07:09.919 --> 00:07:11.990 align:start position:0%
this, you know this. And oftent times I

00:07:12.000 --> 00:07:13.670 align:start position:0%
like to take the agents.mdia from

00:07:13.680 --> 00:07:15.029 align:start position:0%
working with other agents and just

00:07:15.039 --> 00:07:17.270 align:start position:0%
reference that claw.md memory file. This

00:07:17.280 --> 00:07:19.189 align:start position:0%
is the simplest possible agentic layer.

00:07:19.199 --> 00:07:21.110 align:start position:0%
Now in our application layer, if we're

00:07:21.120 --> 00:07:22.710 align:start position:0%
going to user management where we have a

00:07:22.720 --> 00:07:24.710 align:start position:0%
backend for a user management system.

00:07:24.720 --> 00:07:26.070 align:start position:0%
This is just a starting place, right?

00:07:26.080 --> 00:07:27.350 align:start position:0%
This is a great way to when you're

00:07:27.360 --> 00:07:29.029 align:start position:0%
creating a new application, just start

00:07:29.039 --> 00:07:30.950 align:start position:0%
with something an agent can come in here

00:07:30.960 --> 00:07:32.629 align:start position:0%
and understand how to operate this right

00:07:32.639 --> 00:07:34.230 align:start position:0%
away with the memory file and with the

00:07:34.240 --> 00:07:35.749 align:start position:0%
prime command. Okay, so as we work

00:07:35.759 --> 00:07:37.830 align:start position:0%
through classes and grades, we'll talk

00:07:37.840 --> 00:07:39.589 align:start position:0%
about the compute advantage you get by

00:07:39.599 --> 00:07:41.589 align:start position:0%
scaling to this class and grade of a

00:07:41.599 --> 00:07:43.029 align:start position:0%
gentic layer. And then we'll of course

00:07:43.039 --> 00:07:44.629 align:start position:0%
talk about trade-offs. So the compute

00:07:44.639 --> 00:07:46.550 align:start position:0%
advantage here is obvious, right? We get

00:07:46.560 --> 00:07:48.230 align:start position:0%
a clean, minimal setup. It's a great

00:07:48.240 --> 00:07:50.150 align:start position:0%
foundation for agenda growth and agents

00:07:50.160 --> 00:07:52.150 align:start position:0%
understand context immediately. It's a

00:07:52.160 --> 00:07:54.150 align:start position:0%
super small code base. This is easily

00:07:54.160 --> 00:07:56.710 align:start position:0%
reproducible by anyone. There's no value

00:07:56.720 --> 00:07:58.629 align:start position:0%
in a codebase this small. It's useless

00:07:58.639 --> 00:08:00.710 align:start position:0%
for large code bases. Limited capability

00:08:00.720 --> 00:08:02.550 align:start position:0%
and there are many leverage points of

00:08:02.560 --> 00:08:04.629 align:start position:0%
aentic coding that the class one grade 1

00:08:04.639 --> 00:08:07.029 align:start position:0%
aentic layer purely misses. Let's scale

00:08:07.039 --> 00:08:10.070 align:start position:0%
this up. Now we have the class one grade

00:08:10.080 --> 00:08:12.230 align:start position:0%
two. This is where we start surrounding

00:08:12.240 --> 00:08:14.710 align:start position:0%
our codebase with more useful leverage

00:08:14.720 --> 00:08:16.869 align:start position:0%
points of agent coding. Here we

00:08:16.879 --> 00:08:19.270 align:start position:0%
incorporate specialized prompts to help

00:08:19.280 --> 00:08:21.350 align:start position:0%
us plan work. We have a prime command

00:08:21.360 --> 00:08:24.550 align:start position:0%
and we now have access to agents also

00:08:24.560 --> 00:08:27.029 align:start position:0%
known as sub aents. Here we can start

00:08:27.039 --> 00:08:29.189 align:start position:0%
incrementally improving what our

00:08:29.199 --> 00:08:31.110 align:start position:0%
codebase can do. So let's go ahead and

00:08:31.120 --> 00:08:32.389 align:start position:0%
look at what this codebase looks like

00:08:32.399 --> 00:08:33.990 align:start position:0%
now. Right, we have a new specs

00:08:34.000 --> 00:08:35.990 align:start position:0%
directory where our plans are written.

00:08:36.000 --> 00:08:37.350 align:start position:0%
You're very familiar with that pattern.

00:08:37.360 --> 00:08:39.670 align:start position:0%
We also have AI docs so our agents can

00:08:39.680 --> 00:08:41.990 align:start position:0%
pull in documentation to aid their

00:08:42.000 --> 00:08:44.389 align:start position:0%
context. This is all part of the agentic

00:08:44.399 --> 00:08:45.910 align:start position:0%
layer. And our user application is

00:08:45.920 --> 00:08:47.590 align:start position:0%
starting to grow. We have a few tests.

00:08:47.600 --> 00:08:49.269 align:start position:0%
We have modules. But the most important

00:08:49.279 --> 00:08:51.269 align:start position:0%
pieces are here. In addition to our

00:08:51.279 --> 00:08:53.750 align:start position:0%
commands, right, our raw prompts, we now

00:08:53.760 --> 00:08:57.030 align:start position:0%
have some sub aents or just some agents

00:08:57.040 --> 00:08:58.710 align:start position:0%
that we can run, right? So for instance,

00:08:58.720 --> 00:09:01.030 align:start position:0%
you might have a fetch docs sub aent

00:09:01.040 --> 00:09:02.710 align:start position:0%
that will save them in the AI docs

00:09:02.720 --> 00:09:04.470 align:start position:0%
directory and you might have a test

00:09:04.480 --> 00:09:06.150 align:start position:0%
writer. These are just simple examples

00:09:06.160 --> 00:09:08.389 align:start position:0%
of starting to scale up your agentic

00:09:08.399 --> 00:09:09.910 align:start position:0%
layer. You likely have something more

00:09:09.920 --> 00:09:11.430 align:start position:0%
powerful than this, but we're just

00:09:11.440 --> 00:09:13.110 align:start position:0%
working our way up. And now you might

00:09:13.120 --> 00:09:15.110 align:start position:0%
have something like a brand new plan

00:09:15.120 --> 00:09:16.790 align:start position:0%
file. So when you're doing work, you

00:09:16.800 --> 00:09:18.949 align:start position:0%
might prompt this plan file and then

00:09:18.959 --> 00:09:20.790 align:start position:0%
execute it. Very simple. We're still

00:09:20.800 --> 00:09:22.949 align:start position:0%
just stacking things up, slowly building

00:09:22.959 --> 00:09:24.790 align:start position:0%
up our agentic layer. This is a simple

00:09:24.800 --> 00:09:27.190 align:start position:0%
class one grid 2 agentic layer. The big

00:09:27.200 --> 00:09:28.630 align:start position:0%
advantages here is that we have

00:09:28.640 --> 00:09:30.710 align:start position:0%
specialization with sub aents and we can

00:09:30.720 --> 00:09:33.110 align:start position:0%
scale this and parallelize certain

00:09:33.120 --> 00:09:34.550 align:start position:0%
workflows. All right. Right? And now

00:09:34.560 --> 00:09:35.910 align:start position:0%
we're starting to collect documentation

00:09:35.920 --> 00:09:37.990 align:start position:0%
for our agents and we're planning our

00:09:38.000 --> 00:09:40.550 align:start position:0%
work before we implement. So this is

00:09:40.560 --> 00:09:42.389 align:start position:0%
grade two. Many engineers have passed

00:09:42.399 --> 00:09:44.230 align:start position:0%
this level. This is not that novel. It's

00:09:44.240 --> 00:09:45.509 align:start position:0%
not that interesting. We're still

00:09:45.519 --> 00:09:47.350 align:start position:0%
limited in many ways. Right? The big

00:09:47.360 --> 00:09:49.350 align:start position:0%
thing we're missing here is custom tools

00:09:49.360 --> 00:09:51.990 align:start position:0%
which brings us right to grade three. So

00:09:52.000 --> 00:09:54.070 align:start position:0%
in class one, grade three things start

00:09:54.080 --> 00:09:55.910 align:start position:0%
getting interesting and our agentic

00:09:55.920 --> 00:09:58.070 align:start position:0%
layer starts to wrap our application

00:09:58.080 --> 00:10:00.470 align:start position:0%
layer. So here we have three key new

00:10:00.480 --> 00:10:03.990 align:start position:0%
pieces. skills, MCP servers, and prime

00:10:04.000 --> 00:10:06.310 align:start position:0%
commands with tool access. You likely

00:10:06.320 --> 00:10:07.829 align:start position:0%
already know what that is. All these

00:10:07.839 --> 00:10:10.150 align:start position:0%
three things give us the same thing.

00:10:10.160 --> 00:10:12.870 align:start position:0%
Custom tools that enhance our agents

00:10:12.880 --> 00:10:14.630 align:start position:0%
core 4. Let's take a look at what this

00:10:14.640 --> 00:10:16.150 align:start position:0%
actually looks like in an agentic layer

00:10:16.160 --> 00:10:18.470 align:start position:0%
class one grade three. Now, we have a

00:10:18.480 --> 00:10:20.389 align:start position:0%
couple additional base level files. You

00:10:20.399 --> 00:10:23.110 align:start position:0%
might have a MCP.json, Postgress,

00:10:23.120 --> 00:10:25.509 align:start position:0%
Firecrawl, Jira, Notion, whatever tool

00:10:25.519 --> 00:10:27.110 align:start position:0%
you want to use, you can now throw it in

00:10:27.120 --> 00:10:28.630 align:start position:0%
here. But that's not all. We know that

00:10:28.640 --> 00:10:30.790 align:start position:0%
MCPs are very tokenheavy and we can just

00:10:30.800 --> 00:10:32.870 align:start position:0%
prompt engineer properly to get our

00:10:32.880 --> 00:10:34.550 align:start position:0%
agents the tools they need. One of the

00:10:34.560 --> 00:10:36.069 align:start position:0%
ways that that can be done is with

00:10:36.079 --> 00:10:38.150 align:start position:0%
skills. Our agents have learned to

00:10:38.160 --> 00:10:40.230 align:start position:0%
migrate the database. And so inside of

00:10:40.240 --> 00:10:41.829 align:start position:0%
this file, you know, you've seen these

00:10:41.839 --> 00:10:43.910 align:start position:0%
before. We have taught our agent how to

00:10:43.920 --> 00:10:46.150 align:start position:0%
use a specific tool and it can now use

00:10:46.160 --> 00:10:48.710 align:start position:0%
it to perform a specific task. We're

00:10:48.720 --> 00:10:50.389 align:start position:0%
starting to specialize our agents a

00:10:50.399 --> 00:10:52.069 align:start position:0%
little bit more outside of our sub

00:10:52.079 --> 00:10:53.590 align:start position:0%
agents. But we can also do things like

00:10:53.600 --> 00:10:55.430 align:start position:0%
this, right? Start and stop application.

00:10:55.440 --> 00:10:57.350 align:start position:0%
If we open up this skill, we are just

00:10:57.360 --> 00:11:00.069 align:start position:0%
teaching our agent how to use scripts.

00:11:00.079 --> 00:11:01.590 align:start position:0%
There's no need for an MCP server.

00:11:01.600 --> 00:11:03.430 align:start position:0%
Oftent times, you can just build your

00:11:03.440 --> 00:11:04.949 align:start position:0%
own script that exposes the right

00:11:04.959 --> 00:11:06.790 align:start position:0%
functionality. Here we have a start and

00:11:06.800 --> 00:11:08.710 align:start position:0%
a stop tool that starts and stops the

00:11:08.720 --> 00:11:10.949 align:start position:0%
application. Okay, so we're just scaling

00:11:10.959 --> 00:11:13.269 align:start position:0%
up what our agentic layer can do. We're

00:11:13.279 --> 00:11:15.190 align:start position:0%
giving our agents more capability,

00:11:15.200 --> 00:11:16.710 align:start position:0%
right? We are scaling our compute to

00:11:16.720 --> 00:11:18.389 align:start position:0%
scale our impact. Our agents now have

00:11:18.399 --> 00:11:21.190 align:start position:0%
access to custom tools, skills, and

00:11:21.200 --> 00:11:22.870 align:start position:0%
prime commands, right? And keep in mind,

00:11:22.880 --> 00:11:24.550 align:start position:0%
this is something that I want to keep

00:11:24.560 --> 00:11:27.030 align:start position:0%
emphasizing. Skills and MCP servers can

00:11:27.040 --> 00:11:29.509 align:start position:0%
both be replaced with just a simple

00:11:29.519 --> 00:11:31.509 align:start position:0%
prompt. Okay, so we have this prime DB

00:11:31.519 --> 00:11:33.590 align:start position:0%
with tools. You can teach your agents

00:11:33.600 --> 00:11:35.910 align:start position:0%
how to execute CLI commands. Here we're

00:11:35.920 --> 00:11:37.990 align:start position:0%
just using PSQL, right? So that our

00:11:38.000 --> 00:11:39.990 align:start position:0%
agent knows how to interact with the

00:11:40.000 --> 00:11:42.150 align:start position:0%
user management database for this mock

00:11:42.160 --> 00:11:44.230 align:start position:0%
application. And so you can bypass

00:11:44.240 --> 00:11:46.630 align:start position:0%
everything by just understanding how the

00:11:46.640 --> 00:11:48.790 align:start position:0%
core 4 works, context, model, prompt,

00:11:48.800 --> 00:11:51.590 align:start position:0%
and tools. Okay. And notice what we're

00:11:51.600 --> 00:11:53.269 align:start position:0%
doing here, right? We're constantly

00:11:53.279 --> 00:11:55.190 align:start position:0%
giving our agents more capability.

00:11:55.200 --> 00:11:57.750 align:start position:0%
Custom tools is a huge step. Grade three

00:11:57.760 --> 00:12:00.470 align:start position:0%
is very important. Now, this is when

00:12:00.480 --> 00:12:01.750 align:start position:0%
prompt engineering and context

00:12:01.760 --> 00:12:03.430 align:start position:0%
engineering becomes more important.

00:12:03.440 --> 00:12:05.990 align:start position:0%
Skills, MCP servers, and prompts must

00:12:06.000 --> 00:12:08.310 align:start position:0%
have tools carefully designed. This is

00:12:08.320 --> 00:12:09.829 align:start position:0%
where things can start going wrong. And

00:12:09.839 --> 00:12:11.910 align:start position:0%
a lot of engineers do get stuck at grade

00:12:11.920 --> 00:12:13.750 align:start position:0%
three. They think they get past this,

00:12:13.760 --> 00:12:15.750 align:start position:0%
but actually their tools are terrible

00:12:15.760 --> 00:12:17.590 align:start position:0%
and they won't scale. And they're

00:12:17.600 --> 00:12:19.829 align:start position:0%
chewing up tokens. They're burning cash

00:12:19.839 --> 00:12:21.590 align:start position:0%
and they're overengineering their tools,

00:12:21.600 --> 00:12:22.790 align:start position:0%
right? Like one of the most common

00:12:22.800 --> 00:12:24.470 align:start position:0%
problems is that engineers will have way

00:12:24.480 --> 00:12:26.710 align:start position:0%
too many tools. Being able to design and

00:12:26.720 --> 00:12:29.670 align:start position:0%
give your agents the right tools via MCP

00:12:29.680 --> 00:12:33.030 align:start position:0%
server skills and just raw prompts is a

00:12:33.040 --> 00:12:35.350 align:start position:0%
critical skill for every agentic

00:12:35.360 --> 00:12:37.509 align:start position:0%
engineer. Let's move on to grade four.

00:12:37.519 --> 00:12:39.750 align:start position:0%
How do we scale this up even further?

00:12:39.760 --> 00:12:41.670 align:start position:0%
What comes next? Right. So at this

00:12:41.680 --> 00:12:43.269 align:start position:0%
point, we start scaling up our prompts

00:12:43.279 --> 00:12:46.310 align:start position:0%
and we start building up feedback loops

00:12:46.320 --> 00:12:48.949 align:start position:0%
in the codebase. Okay, so this is where

00:12:48.959 --> 00:12:50.629 align:start position:0%
things become very powerful and where

00:12:50.639 --> 00:12:52.710 align:start position:0%
you can really scale what you can do.

00:12:52.720 --> 00:12:54.069 align:start position:0%
So, of course, we have our plan prompt,

00:12:54.079 --> 00:12:55.590 align:start position:0%
but now we'll have things like our build

00:12:55.600 --> 00:12:57.509 align:start position:0%
prompt, right? A higher order prompt.

00:12:57.519 --> 00:12:59.750 align:start position:0%
Grade four is distinct and that you

00:12:59.760 --> 00:13:02.470 align:start position:0%
start asking your agents to review their

00:13:02.480 --> 00:13:04.069 align:start position:0%
work. This is where you realize that you

00:13:04.079 --> 00:13:07.190 align:start position:0%
should always add feedback loops into

00:13:07.200 --> 00:13:09.269 align:start position:0%
your agentic layer. You're effectively

00:13:09.279 --> 00:13:11.110 align:start position:0%
adding more compute to get more

00:13:11.120 --> 00:13:13.430 align:start position:0%
confidence in your agents results. All

00:13:13.440 --> 00:13:16.069 align:start position:0%
right, this is the big idea in tactical

00:13:16.079 --> 00:13:18.550 align:start position:0%
agentic coding. Lesson five. Right here

00:13:18.560 --> 00:13:20.230 align:start position:0%
we're building closed loop prompts. All

00:13:20.240 --> 00:13:21.750 align:start position:0%
right, let's understand the application

00:13:21.760 --> 00:13:23.190 align:start position:0%
structure. So now we have things like

00:13:23.200 --> 00:13:25.350 align:start position:0%
app review. So not only are you planning

00:13:25.360 --> 00:13:26.949 align:start position:0%
your work, you're having your agents

00:13:26.959 --> 00:13:29.110 align:start position:0%
review the work done and then report it.

00:13:29.120 --> 00:13:30.310 align:start position:0%
And you're doing this with powerful

00:13:30.320 --> 00:13:32.870 align:start position:0%
prompts like the code review prompt, the

00:13:32.880 --> 00:13:34.389 align:start position:0%
review prompt. You're then running

00:13:34.399 --> 00:13:36.710 align:start position:0%
reproduce bugs and then things like test

00:13:36.720 --> 00:13:38.470 align:start position:0%
backend, test front end. All right, so

00:13:38.480 --> 00:13:40.230 align:start position:0%
for instance, what does review do? Code

00:13:40.240 --> 00:13:42.710 align:start position:0%
review current changes, review all stage

00:13:42.720 --> 00:13:44.230 align:start position:0%
changes, do a bunch of stuff, and then

00:13:44.240 --> 00:13:45.750 align:start position:0%
we're going to output some concrete

00:13:45.760 --> 00:13:47.509 align:start position:0%
results. You might also do something

00:13:47.519 --> 00:13:49.670 align:start position:0%
like reproduce a bug. This is where we

00:13:49.680 --> 00:13:52.310 align:start position:0%
would save a concrete resolution file

00:13:52.320 --> 00:13:54.870 align:start position:0%
into app reviews. This becomes really

00:13:54.880 --> 00:13:57.189 align:start position:0%
powerful when you start giving your sub

00:13:57.199 --> 00:13:59.189 align:start position:0%
agents these abilities. Okay, so we can

00:13:59.199 --> 00:14:01.750 align:start position:0%
run something like a review agent and

00:14:01.760 --> 00:14:03.829 align:start position:0%
you can scale this up and then it will

00:14:03.839 --> 00:14:06.790 align:start position:0%
output its review into a specific file.

00:14:06.800 --> 00:14:08.470 align:start position:0%
Inside of our application layer here,

00:14:08.480 --> 00:14:10.069 align:start position:0%
you'll also notice something. As you

00:14:10.079 --> 00:14:11.590 align:start position:0%
start to grow your codebase, your

00:14:11.600 --> 00:14:13.670 align:start position:0%
agentic layer and your application layer

00:14:13.680 --> 00:14:15.590 align:start position:0%
will be growing side by side. We've now

00:14:15.600 --> 00:14:17.590 align:start position:0%
split out our application into client

00:14:17.600 --> 00:14:19.430 align:start position:0%
and server. At some point, your small

00:14:19.440 --> 00:14:21.269 align:start position:0%
codebase will grow and it will start to

00:14:21.279 --> 00:14:22.790 align:start position:0%
fracture. This is important. We'll look

00:14:22.800 --> 00:14:25.110 align:start position:0%
at this in the next grade. But with this

00:14:25.120 --> 00:14:27.269 align:start position:0%
application directory structure, we're

00:14:27.279 --> 00:14:30.470 align:start position:0%
still able to keep all related code for

00:14:30.480 --> 00:14:33.110 align:start position:0%
this product under the same code base.

00:14:33.120 --> 00:14:35.269 align:start position:0%
Now, how this operates in Git is

00:14:35.279 --> 00:14:36.629 align:start position:0%
important. We'll talk about that in just

00:14:36.639 --> 00:14:38.470 align:start position:0%
a moment. Since we have both a front end

00:14:38.480 --> 00:14:40.389 align:start position:0%
and backend application, you can start

00:14:40.399 --> 00:14:42.389 align:start position:0%
specializing your prompts, right? test

00:14:42.399 --> 00:14:45.670 align:start position:0%
backend, test front end. Here we have a

00:14:45.680 --> 00:14:47.829 align:start position:0%
concrete closed loop prompt. I'm being

00:14:47.839 --> 00:14:49.990 align:start position:0%
really verbose here with my language

00:14:50.000 --> 00:14:51.750 align:start position:0%
inside of these mock prompts. You know,

00:14:51.760 --> 00:14:53.829 align:start position:0%
we're following that three-step workflow

00:14:53.839 --> 00:14:56.389 align:start position:0%
from tactical agent to coding lesson 5.

00:14:56.399 --> 00:14:59.110 align:start position:0%
Request, validate, resolve. This creates

00:14:59.120 --> 00:15:01.269 align:start position:0%
a closed loop where your agent can spin

00:15:01.279 --> 00:15:04.389 align:start position:0%
and spin until the job is done. This

00:15:04.399 --> 00:15:07.430 align:start position:0%
distinctly marks grade four. Again, this

00:15:07.440 --> 00:15:09.590 align:start position:0%
is a place where engineers fall off and

00:15:09.600 --> 00:15:11.750 align:start position:0%
they miss out on using more compute to

00:15:11.760 --> 00:15:13.189 align:start position:0%
get the job done, right? We're starting

00:15:13.199 --> 00:15:15.189 align:start position:0%
to split our prompts to focus on

00:15:15.199 --> 00:15:17.590 align:start position:0%
specific areas of this codebase. Okay,

00:15:17.600 --> 00:15:19.110 align:start position:0%
so things are going from really generic

00:15:19.120 --> 00:15:21.990 align:start position:0%
and vague, right? Plan build to more

00:15:22.000 --> 00:15:24.389 align:start position:0%
specific, right? Test our backend, test

00:15:24.399 --> 00:15:26.550 align:start position:0%
our front end, review with this code how

00:15:26.560 --> 00:15:28.230 align:start position:0%
we like to do it. All right, and the

00:15:28.240 --> 00:15:30.310 align:start position:0%
advantages here are really clear, right?

00:15:30.320 --> 00:15:32.069 align:start position:0%
Once you start using closed loop prompts

00:15:32.079 --> 00:15:33.750 align:start position:0%
in your codebase, your agents start

00:15:33.760 --> 00:15:35.670 align:start position:0%
resolving their own work. You can create

00:15:35.680 --> 00:15:37.670 align:start position:0%
specialized tasks for your front end,

00:15:37.680 --> 00:15:39.430 align:start position:0%
for your back end, for whatever part of

00:15:39.440 --> 00:15:41.430 align:start position:0%
your codebase, and it's all still on

00:15:41.440 --> 00:15:43.189 align:start position:0%
this top layer. Now, we're not going to

00:15:43.199 --> 00:15:45.189 align:start position:0%
dive into codebase organization too much

00:15:45.199 --> 00:15:46.710 align:start position:0%
here. There are some leverage points of

00:15:46.720 --> 00:15:48.389 align:start position:0%
agent coding that we're not going to

00:15:48.399 --> 00:15:50.150 align:start position:0%
re-emphasize here. Here, we're focused

00:15:50.160 --> 00:15:51.910 align:start position:0%
on giving our agents the highest

00:15:51.920 --> 00:15:54.389 align:start position:0%
capability possible so that they are as

00:15:54.399 --> 00:15:56.710 align:start position:0%
autonomous as possible. Now, there are

00:15:56.720 --> 00:15:58.310 align:start position:0%
some trade-offs here. Again, things

00:15:58.320 --> 00:16:00.069 align:start position:0%
start to get more complex. You need to

00:16:00.079 --> 00:16:02.069 align:start position:0%
know how to prompt engineer. This is why

00:16:02.079 --> 00:16:04.310 align:start position:0%
our agentic prompt engineering lesson

00:16:04.320 --> 00:16:06.310 align:start position:0%
was so important. You must know how to

00:16:06.320 --> 00:16:07.990 align:start position:0%
write these prompts properly.

00:16:08.000 --> 00:16:10.150 align:start position:0%
Self-correcting agents is a massive

00:16:10.160 --> 00:16:12.310 align:start position:0%
massive win for your agentic layer.

00:16:12.320 --> 00:16:13.749 align:start position:0%
Let's move on to grade five. How does

00:16:13.759 --> 00:16:15.829 align:start position:0%
our agentic layer continue progressing?

00:16:15.839 --> 00:16:18.870 align:start position:0%
Now, by this point u many engineers have

00:16:18.880 --> 00:16:21.670 align:start position:0%
many many prompts, many agents, several

00:16:21.680 --> 00:16:23.509 align:start position:0%
skills. They've used many different

00:16:23.519 --> 00:16:26.069 align:start position:0%
types of MCP servers and they start

00:16:26.079 --> 00:16:29.030 align:start position:0%
scaling their work even further with a

00:16:29.040 --> 00:16:31.030 align:start position:0%
key concept we discussed in lesson

00:16:31.040 --> 00:16:34.040 align:start position:0%
three.
